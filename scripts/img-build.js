async function preBuild() {
    const { default: imagemin } = await import("imagemin");
    const { default: webp } = await import("imagemin-webp");
    const path = require("path");

    const IMAGES_DIR = path.resolve(__dirname, "..", "src", "assets")
    await imagemin([path.join(IMAGES_DIR, "*.{jpg,png}")], {
        destination: IMAGES_DIR,
        plugins: [webp({ quality: 60 })],
    })

}

preBuild().then(() => console.log("Success"))
