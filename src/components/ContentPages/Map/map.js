import React, { Component } from 'react';
import { Stage, Layer, Image as ImageKonva} from 'react-konva';
import Konva from 'konva';
import Hammer from 'react-hammerjs';

const PDFJS = window.pdfjsLib;
const url = 'https://koetsuki-dev.mosin.jp/koetsuki_roku_circlemap.pdf';

const TIMES = 3;

const MINIMUM_SCALE = 0.05;


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
        img: null,
        canvas: null,
    }

    updateViewPort = (width, height) => {
        if(this.state.mapWidth === width && this.state.mapHeight === height) return;
        this.setState({
            //mapWidth: width,
            mapWidth: window.innerWidth - 16,
            //mapHeight: height
            //mapHeight: window.innerHeight - 130,
        });
    };

    getContext() {
        return this.refs.layer.getContext('2d')._context;
    }

    getResource = async () => {
        if(!url) return;

        const img = new Image();
        img.onload = () => {
            this.setState({ img });
        };

        if(/pdf$/.test(url)) {
            const pdf = await PDFJS.getDocument(url);
            const page = await pdf.getPage(1);
            const cv = document.createElement('canvas');
            const context = cv.getContext('2d');
            const viewport = page.getViewport({ scale: TIMES});
            const { width, height } = viewport;
            viewport.width = width / TIMES;
            viewport.height = height / TIMES;
            cv.height = height;
            cv.width = width;
            this.updateViewPort(width, height);
            await page.render({ canvasContext: context, viewport }).promise
            img.src = cv.toDataURL();
            return;
        }

        img.src = url;
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

    componentDidMount() {
        this.getResource();
    }

    onPinch = e => {
        const stage = this.refs.stage;
        const oldScale = stage.scale();
        const mousePointTo = {
            x: e.center.x / oldScale.x - stage.x() / oldScale.x,
            y: e.center.y / oldScale.y - stage.y() / oldScale.y,
        };

        const diff = this.state.previousScale - e.scale;
        const newScale = Math.max(MINIMUM_SCALE, oldScale.y - diff);

        const newState = {
            scale: newScale,
            previousScale: e.scale,
            x: -(mousePointTo.x - e.center.x / newScale) * newScale,
            y: -(mousePointTo.y - e.center.y / newScale) * newScale
        };
        this.setState(newState);
    };

    onPinchMove = e => {
        const { deltaX, deltaY } = e;
        this.setState({
            x: this.state.prevX + deltaX,
            y: this.state.prevY + deltaY,
        });
    };


    /*
     * hammer.js onPinchStart event
     */
    onPinchStart = e => {
        this.setState({
            previousScale: 1,
            prevX: this.state.x,
            prevY: this.state.y
        });
    };

    /*
     * hammer.js onPan event
     */
    onPan = e => {
        const { deltaX, deltaY } = e;
        this.setState({
            x: this.state.prevX + deltaX,
            y: this.state.prevY + deltaY,
        });
    };

    /*
     * hammer.js onPanEnd event
     */
    onPanStart = e => {
        this.setState({
            prevX: this.state.x,
            prevY: this.state.y
        });
    };

    /*
     * React-Konva onWheel event
     */
    handleWheel = e => {
        e.evt.preventDefault();

        const scaleBy = 1.2;
        const stage = e.target.getStage();
        const oldScale = stage.scale();
        const mousePointTo = {
            x: stage.getPointerPosition().x / oldScale.x - stage.x() / oldScale.x,
            y: stage.getPointerPosition().y / oldScale.y - stage.y() / oldScale.y,
        };

        const newScale = Math.max(MINIMUM_SCALE, e.evt.deltaY > 0 ? oldScale.y / scaleBy : oldScale.y * scaleBy);

        this.setState({
            scale: newScale,
            x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
            y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
        });
    }

    render() {
        const options = {
            recognizers: {
                pinch: {
                    enable: true
                }
            }
        };

        const { img } = this.state;

        if(!img) return null;

        return (
        <Hammer
            onPinch={this.onPinch}
            onPinchStart={this.onPinchStart}
            /*onPinchMove={this.onPinchMove}*/

            onPan={this.onPan}
            onPanStart={this.onPanStart}

            options={options}>
            <div>
                <Stage ref="stage" onWheel={this.handleWheel} scale={{ x: this.state.scale, y: this.state.scale }}x={this.state.x} y={this.state.y} width={this.state.mapWidth} height={this.state.mapHeight}>
                    <Layer>
                        <ImageKonva image={this.state.img} space="fill"/>
                    </Layer>
                </Stage>
            </div>
        </Hammer>
        );
    }
};

export default Map;
