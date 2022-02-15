import img from "../../public/img/icons.png";

const loadImage = (quantity: number): Promise<HTMLImageElement> => {
  let ImgIcons: string[] = [];
  return new Promise(async (resolve: any, reject: any) => {
    for (let i = 0; i < quantity; i++) {
      let x = i * 80;
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 80;
        canvas.height = 80;
        const imgElement = new Image();
        imgElement.src = img;
        let slice = new Image();

        const waitForImageToLoad = (imageElement: HTMLImageElement) => {
          return new Promise((resolve) => {
            imageElement.onload = resolve;
          });
        };
        await waitForImageToLoad(imgElement);
        ctx.drawImage(imgElement, x, 0, 80, 80, 0, 0, 80, 80);
        slice.src = canvas.toDataURL();

        await waitForImageToLoad(slice);
        ImgIcons.push(slice.src);
      } catch (error) {
        reject(error);
      }
    }

    resolve(ImgIcons);
  });
};

export default loadImage;
