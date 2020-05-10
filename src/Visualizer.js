import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";

const Canvas = styled.canvas`
    width: 100%;
    height: 100%;
`;

const Visualizer = () => {
    const canvas = useRef();
    const context = useRef();

    const resetCanvasSize = () => {
        canvas.current.width = window.innerWidth;
        canvas.current.height = window.innerHeight;

        bufferingDraw({
            width: canvas.current.width,
            height: canvas.current.height,
        });
    };

    const handleDraw = (context) => {
        context.font = "50px serif";
        context.fillText("hello world", 210, 75);
    };

    const bufferingDraw = ({ width, height }) => {
        const buffer = document.createElement("canvas");
        buffer.width = width;
        buffer.height = height;
        handleDraw(buffer.getContext("2d"));
        context.current.drawImage(buffer, 0, 0);
    };

    useEffect(() => {
        context.current = canvas.current.getContext("2d");

        resetCanvasSize();

        bufferingDraw({
            width: canvas.current.width,
            height: canvas.current.height,
        });

        window.addEventListener("resize", resetCanvasSize);
    }, []);

    return <Canvas ref={canvas}></Canvas>;
};

export default Visualizer;
