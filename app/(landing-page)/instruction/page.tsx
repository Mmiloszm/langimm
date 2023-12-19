import styles from "@/styles/landing-page/instruction/instruction.module.scss";
import Contests from "@/components/landing-page/instruction/Contests";
import Instructions from "@/components/landing-page/instruction/Instructions";
export default function Instruction() {
  return (
    <main className={styles.instructionsContainer}>
      <Contests />
      <Instructions />
    </main>
  );
}
