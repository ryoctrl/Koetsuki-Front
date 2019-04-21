import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import axios from 'axios';

class Top extends Component {
    onClick() {
        axios.get('/api').then((res) => {
            console.log(res.data);
        });
    }
    render() {
        return (
            <div>
                <div> This page is top!</div>
                <Button>
                    <a href="/api/auth/twitter">
                        Twitter登録/ログイン
                    </a>
                </Button>
            </div>
        )
    }
}

export default Top;
