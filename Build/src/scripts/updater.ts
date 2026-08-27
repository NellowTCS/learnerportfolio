import { Updato } from "@nellowtcs/updato";
import { UpdateNotification } from "@nellowtcs/updato/update-ui";

declare global {
  const __APP_VERSION__: string;
}

const updater = Updato.init(
  {
    repo: "NellowTCS/learnerportfolio",
    mode: "version",
    current: __APP_VERSION__,
  },
  {
    onUpdate: (info) => {
      new UpdateNotification(updater, {
        heading: `v${info.latest} ready`,
      }).show(info);
    },
    onError: (err) => console.warn("Updato:", err.message),
    onProgress: (pct, file) => console.log(`Updato: ${pct}% - ${file}`),
  },
);

export { updater };