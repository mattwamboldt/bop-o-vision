import * as React from 'react';

class Display extends React.Component {
    private canvasRef: HTMLCanvasElement = null;
    private resizeTimeout: number = 0;

    public componentDidMount() {
        window.addEventListener('resize', this.resizeHandler);
        this.resize();
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.resizeHandler);
    }

    public render() {
        return (
            <div id='display'>
                <canvas id="visualizer" ref={(r) => { this.canvasRef = r; }}></canvas>
            </div>
        );
    }

    private resizeHandler = () => {
        if (this.resizeTimeout) {
            window.clearTimeout(this.resizeTimeout);
        }

        this.resizeTimeout = window.setTimeout(this.resize, 50);
    }

    private resize = () => {
        this.canvasRef.width = this.canvasRef.parentElement.clientWidth;
        this.canvasRef.height = this.canvasRef.parentElement.clientHeight;
        this.resizeTimeout = 0;
    }
};

export default Display;