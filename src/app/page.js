import Image from "next/image";
import styles from "./page.module.css";
import LDSDK from "@/lib/ldServer";
import LogoClientComponent from "@/components/LogoClientComponent";

export default async function Home({ searchParams }) {
  const defaultLogoProps = {
    defaultSrc: "/next.svg",
    srcTrue: "/launchdarkly.svg",
  };

  const i2iValue = await LDSDK.getVariation(
    "image-to-image",
    {
      kind: "market",
      key: searchParams?.market || "",
      name: "Phoenix",
      user: "Jacob Granberry",
    },
    "Control"
  );
  return (
    <main className={styles.main}>
      <h1>THM LaunchDarkly POC</h1>
      <div>
        <h2 className={styles.center}>
          <LogoClientComponent flagKey='marketToMarket' {...defaultLogoProps} />
          {i2iValue === "Control"
            ? "Default headline"
            : "New headline that targets Phoenix users only"}
        </h2>
      </div>
    </main>
  );
}
