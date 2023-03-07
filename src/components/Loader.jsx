import React from "react";

const Loader = () => {
    setTimeout(() => {
        if (typeof window !== "undefined") {
            const contenedor = document.getElementById('loader');
            contenedor.style.visibility = "hidden";
        }
    }, 400);

    return (
        <>
            <div id="loader" className="d-flex justify-content-center">
                <div className="loader">
                    <span></span>
                    <span></span>
                </div>
            </div>
        </>
    );
}

export default Loader;