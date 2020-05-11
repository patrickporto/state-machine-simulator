import React, { useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import cytoscape from "cytoscape";
import klay from "cytoscape-klay";

cytoscape.use(klay);

const Canvas = styled.div`
    width: 100%;
    height: 100%;
`;

const CytoscapeRenderer = ({ initialState, currentState, onTransact }) => {
    const renderer = useRef();
    const cy = useRef(
        cytoscape({
            style: [
                // the stylesheet for the graph
                {
                    selector: "node",
                    style: {
                        "background-color": "#A28AFF",
                        label: "data(id)",
                        color: "#ffffff",
                    },
                },
                {
                    selector: "edge",
                    style: {
                        width: 3,
                        "line-color": "#ffffff",
                        "target-arrow-color": "#ffffff",
                        "target-arrow-shape": "triangle",
                        "curve-style": "bezier",
                        label: "data(label)",
                        color: "#ffffff",
                        "text-background-color": "#A28AFF",
                        "text-background-shape": "round-rectangle",
                        "text-background-opacity": 1,
                        "text-background-padding": 8,
                    },
                },
                {
                    selector: ".highlighted",
                    style: {
                        "line-color": "#ffffff",
                        "target-arrow-color": "#ffffff",
                        "transition-property":
                            "background-color, line-color, target-arrow-color",
                        "transition-duration": "0.5s",
                        "text-background-color": "#61bffc",
                    },
                },
                {
                    selector: ".highlighted.hover",
                    style: {
                        "line-color": "#61bffc",
                        "target-arrow-color": "#61bffc",
                        "transition-property":
                            "background-color, line-color, target-arrow-color",
                        "transition-duration": "0.3s",
                        "text-background-color": "#61bffc",
                    },
                },
            ],
        })
    );

    const handleChangeState = useCallback(
        (evt) => {
            const edge = cy.current.$(`#${evt.target.id()}`);
            if (currentState !== edge.source().id()) {
                return;
            }
            const node = edge.target();
            onTransact(node.id());
        },
        [currentState, onTransact]
    );

    useEffect(() => {
        cy.current.mount(renderer.current);
        cy.current.add([
            {
                group: "nodes",
                data: { id: "idle" },
            },
            {
                group: "nodes",
                data: { id: "pending" },
            },
            {
                group: "nodes",
                data: { id: "resolved" },
            },
            {
                group: "nodes",
                data: { id: "rejected" },
            },
            {
                group: "edges",
                data: {
                    label: "fetch",
                    source: "idle",
                    target: "pending",
                },
            },
            {
                group: "edges",
                data: {
                    label: "done",
                    source: "pending",
                    target: "resolved",
                },
            },
            {
                group: "edges",
                data: {
                    label: "error",
                    source: "pending",
                    target: "rejected",
                },
            },
            {
                group: "edges",
                data: {
                    label: "fetch",
                    source: "rejected",
                    target: "pending",
                },
            },
        ]);
        cy.current.on("mouseover", "edge", ({ target }) => {
            target.addClass("hover");
        });
        cy.current.on("mouseout", "edge", ({ target }) => {
            target.removeClass("hover");
        });

        const layout = cy.current.layout({
            name: "klay",
            klay: { spacing: 200 },
        });

        const node = cy.current.$(`#${currentState}`);
        node.addClass("highlighted");
        const edges = node.outgoers("edge");
        for (const edge of edges) {
            edge.addClass("highlighted");
        }

        layout.run();
    }, []);

    useEffect(() => {
        const node = cy.current.$(`#${currentState}`);
        cy.current.elements().removeClass("highlighted");
        node.addClass("highlighted");
        const edges = node.outgoers("edge");
        for (const edge of edges) {
            edge.addClass("highlighted");
        }

        cy.current.on("tap", "edge", handleChangeState);
        return () => {
            cy.current.removeListener("tap", handleChangeState);
        };
    }, [currentState]);

    return <Canvas ref={renderer}></Canvas>;
};

CytoscapeRenderer.propTypes = {
    currentState: PropTypes.string.isRequired,
    initialState: PropTypes.string.isRequired,
    onTransact: PropTypes.func.isRequired,
};

export default CytoscapeRenderer;
