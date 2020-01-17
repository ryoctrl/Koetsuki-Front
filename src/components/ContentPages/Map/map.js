import React, { Component } from 'react';
import { Stage, Layer, Text } from 'react-konva';
import Konva from 'konva';
import PinchToZoom from 'react-pinch-and-zoom';
import Hammer from 'react-hammerjs';

const PDFJS = window.pdfjsLib;

class Map extends Component {
    state = {
        mapWidth: 1000,
        mapHeight: 1000,
        text: 'サークルマップはまだないよ。',
        scale: 1,
        prevScale: 1,
        startRatio: 1,
        changingScale: false,
        scaleChanged: false,
        reseted: false,
        x: 0,
        y: 0,
        prevX: 0,
        prevY: 0,
    }

    updateViewPort = (width, height) => {
        if(this.state.mapWidth === width && this.state.mapHeight === height) return;
        this.setState({
            mapWidth: width,
            mapHeight: height
        });
    };

    getContext() {
        return this.refs.layer.getContext('2d')._context;
    }

    fillFavorites = resizeRatio => {
        const favorites = [[0, 0], [362, 1680], [386, 1831]];

        //塗りつぶしす四角の幅と高さ
        const fillSize = [25, 20]
        const context = this.getContext();

        context.fillStyle = 'red';
        
        for(const fav of favorites) {
            context.fillRect(...fav.concat(fillSize).map(v => v / resizeRatio));
        }

    }

    renderCircleMap = () => {
        const url = '';
        //const url = 'https://koetsuki-dev.mosin.jp/circlemap-test.jpg';
        if(!url) return;

        if(/pdf$/.test(url)) {
            PDFJS.getDocument(url).then(pdf => {
                pdf.getPage(1).then(page => {
                    const context = this.getContext();
                    const viewport = page.getViewport(1);
                    const { width, height } = viewport;
                    this.updateViewPort(width, height);
                    const renderTask = page.render({ canvasContext: context, viewport});
                    renderTask.then(() => {
                        this.fillFavorites(1);
                    });
                });
            });
        }else if(/jpg$/.test(url)) {
            const img = new Image();
            img.onload = () => {
                const resizeRatio = 4;
                const { width, height } =img;
                const resizedWidth = width / resizeRatio, resizedHeight = height / resizeRatio;
                this.updateViewPort(resizedWidth, resizedHeight);
                process.nextTick(() => {
                    const context = this.getContext();
                    context.drawImage(img, 0, 0, width, height, 0, 0, resizedWidth, resizedHeight);

                    this.fillFavorites(resizeRatio);

                    if(width > window.innerWidth) {
                        console.log('scale resized!');
                        this.refs.layer.scaleX(window.innerWidth / width);
                    }

                    //this.setState({ text: 'img loaded!'});
                });
            };
            img.src = url;
        }
    };

    componentDidMount() {
        this.renderCircleMap();
    }

    onPinch = e => {
        const diff = this.state.startRatio / e.scale;
        const newScale = this.state.prevScale  / diff;
        this.setState({
            scale: newScale,
        });
    };

    onPinchStart = e => {
        this.setState({
            prevScale: this.state.scale,
            startRatio: e.scale,
            changingScale: true,
        });
    };

    onPinchEnd = e => {
        this.setState({
            prevScale: e.scale,
            scaleChanged: true,
        });
    }

    onPanStart = e => {
        /*
        this.setState({
            prevX: this.state.x,
            prevY: this.state.y,
            text: 'pan start!!',
        });
        */
    };

    onPan = e => {
        if(this.state.changingScale) {
            if(this.state.scaleChanged && !this.state.reseted) {
                this.setState({ reseted: true});
                setTimeout(() => {
                    this.setState({
                        changingScale: false,
                        scaleChanged: false,
                    });
                }, 300);
            }
            return;
        }
        const { deltaX, deltaY } = e;
        console.log(e);
        console.log('Pan!');
        this.setState({
            x: this.state.prevX + deltaX,
            y: this.state.prevY + deltaY,
            text: JSON.stringify(e, null, '    ')
        });
    };

    onPanEnd = e => {
        this.setState({
            prevX: this.state.x,
            prevY: this.state.y
        });
    };

    
    render() {
        const { classes } = this.props;

        const options = {
            recognizers: {
                pinch: {
                    enable: true
                }
            }
        };


        return (
            <Hammer
                onTap={this.onTap}

                onPinch={this.onPinch}
                onPinchStart={this.pinchStart}
                onPinchEnd={this.pinchEnd}

                onPan={this.onPan}
                onPanStart={this.onPanStart}
                onPanEnd={this.onPanEnd}

                options={options}>
                <div>
                    <Stage  scale={{ x: this.state.scale, y: this.state.scale }} width={this.state.mapWidth} height={this.state.mapHeight}>
                        {/*<Layer ref="layer" _useStrictMode />*/}
                        <Layer x={this.state.x} y={this.state.y}>
                            <Text text={this.state.text}/>
                        </Layer>
                    </Stage>
                </div>
            </Hammer>

        );
    }
};

export default Map;
