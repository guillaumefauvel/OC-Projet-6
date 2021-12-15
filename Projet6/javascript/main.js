import { getDatas } from "./data_gathering.js";
import { showImage, addFilmsInfos } from "./html_modifier.js";
import { listener } from "./modal_manager.js";


listener()

async function launch() {
    let datas = await (getDatas());
    showImage(datas);
    addFilmsInfos(datas);
}

launch()