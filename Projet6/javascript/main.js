import { getDatas } from "./data_gathering.js";
import { showImage, addFilmsInfos } from "./html-modifier.js";
import { listener } from "./modal-manager.js";


listener()

async function launch() {
    let datas = await (getDatas());
    showImage(datas);
    addFilmsInfos(datas);
}

launch()