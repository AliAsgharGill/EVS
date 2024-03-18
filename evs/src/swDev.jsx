// export default function swDev() {
// let swUrl = `${process.env.REACT_APP_PUBLIC_URL}/sw.jsx`;
//     let swUrl = `${import.meta.env.VITE_PUBLIC_URL}/sw.js`;
//     navigator.serviceWorker.register(swUrl).then((response) => {
//         console.log("Response: ", response);
//     });
// }

export default function swDev() {
    let swUrl = `${import.meta.env.VITE_PUBLIC_URL}/sw.jsx`;
    navigator.serviceWorker.register(swUrl).then((response) => {
        console.log("Response: ", response);
    });
}
