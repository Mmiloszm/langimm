"use client";
import { instruction } from "@/lib/constants/instructions";
import styles from "@/styles/landing-page/instruction/instructions.module.scss";
import Image from "next/image";
const Instructions = () => {
  return (
    <section className={styles.instructions}>
      <div id="loginInstructions">
        <h3 className={styles.header}>1. Tworzenie konta i logowanie.</h3>
        <p>1.1. {instruction.login[0].text}</p>
        <div className={styles.formsWrapper}>
          <Image
            src={"/instructions/register.png"}
            width={350}
            height={500}
            alt="Formularz rejestracji."
            quality={100}
          />
        </div>
        <p>1.2. {instruction.login[1].text}</p>
      </div>
      <div id="firstTimeInstructions">
        <h3 className={styles.header}>2. Pierwsze kroki.</h3>
        {instruction.firstTime.map((item, index) => {
          return (
            <div key={item.id} className={styles.wrapper}>
              <p id={String(item.id)}>{`2.${index + 1}. ` + item.text}</p>
              <div className={styles.mediaWrapper}>
                {item.img && (
                  <Image
                    alt=""
                    src={item.img}
                    width={350}
                    height={500}
                    className={styles.img}
                  />
                )}
                {item.vid && (
                  <video controls src={item.vid} className={styles.vid} />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div id="dashboardInstructions">
        <h3 className={styles.header}>3. Główny panel użytkownika.</h3>
        {instruction.dashboard.map((item, index) => {
          return (
            <div key={item.id} className={styles.wrapper}>
              <p id={String(item.id)}>{`3.${index + 1}. ` + item.text}</p>
              <div className={styles.formsWrapper}>
                {item.img && (
                  <Image
                    alt={item.imgAlt}
                    src={item.img}
                    width={330}
                    height={300}
                    quality={100}
                    className={styles.img}
                  />
                )}
                {item.vid && (
                  <video controls src={item.vid} className={styles.vid} />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div id="articleInstructions">
        <h3 className={styles.header}>4. Artykuł.</h3>
        {instruction.article.map((item, index) => {
          return (
            <div key={item.id} className={styles.wrapper}>
              <p id={String(item.id)}>{`4.${index + 1}. ` + item.text}</p>
              <div className={styles.mediaWrapper}>
                {item.img && (
                  <Image
                    alt=""
                    src={item.img}
                    width={350}
                    height={500}
                    className={styles.img}
                  />
                )}
                {item.vid && (
                  <video controls src={item.vid} className={styles.vid} />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div id="knowledgeBaseInstructions">
        <h3 className={styles.header}>5. Baza wiedzy.</h3>
        {instruction.knowledgeBase.map((item, index) => {
          return (
            <div key={item.id} className={styles.wrapper}>
              <p id={String(item.id)}>{`5.${index + 1}. ` + item.text}</p>
              <div className={styles.mediaWrapper}>
                {item.img && (
                  <Image
                    alt=""
                    src={item.img}
                    width={350}
                    height={500}
                    className={styles.img}
                  />
                )}
                {item.vid && (
                  <video controls src={item.vid} className={styles.vid} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default Instructions;
