import Image from "next/image";
import styles from "./page.module.css";
import LDSDK from "@/lib/ldServer";

export default async function Home() {
  const i2iValue = await LDSDK.getVariation(
    "image-to-image",
    {
      kind: "market",
      key: "phoenix",
      name: "Phoenix",
      user: "Jacob Granberry",
    },
    false
  );
  return (
    <main className={styles.main}>
      <h1>THM Test POC</h1>
      <div>
        <h2 className={styles.center}>
          {i2iValue === "Control"
            ? "Default headline"
            : "New headline that targets Phoenix users only"}
        </h2>
      </div>
    </main>
  );
}
