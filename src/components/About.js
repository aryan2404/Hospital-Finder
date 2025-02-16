import React from "react";
import styles from "../styles/About.module.css";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.section
      className={styles.aboutPage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className={styles.floatingCircle}></div>
      <div className={styles.floatingCircle2}></div>

      <div className={styles.container}>
        <motion.h1 
          className={styles.title}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          About <span>HospitalFinder</span>
        </motion.h1>

        <motion.p
          className={styles.description}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <strong>HospitalFinder</strong> makes it easy to find nearby hospitals based on your real-time location.
          Whether it's an emergency or just planning ahead, 
          HospitalFinder gives you quick access to medical facilities with an interactive map and precise location details.
        </motion.p>

        <div className={styles.features}>
          <motion.div 
            className={styles.card}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h2>📍 Real-Time Location</h2>
            <p>Find hospitals nearest to your current location in seconds.</p>
          </motion.div>

          <motion.div 
            className={styles.card}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h2>🌍 Interactive Map</h2>
            <p>See hospital names and addresses easily, helping you find nearby medical facilities with confidence.</p>
          </motion.div>

          <motion.div 
            className={styles.card}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h2>🛡️ Emergency Ready</h2>
            <p>Get quick access to healthcare when you need it most.</p>
          </motion.div>
        </div>

        <motion.a
          href="/map"
          className={styles.ctaButton}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Find Hospitals Now
        </motion.a>
      </div>
    </motion.section>
  );
};

export default About;
