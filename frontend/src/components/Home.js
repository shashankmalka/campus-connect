import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css'; // Use CSS module

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <nav className={styles.navbar}>
        <h1>CampusConnect</h1>
        <ul className={styles.navLinks}>
          <li><a href="#admissions">Admissions</a></li>
          <li><a href="#students">Students</a></li>
          <li><a href="#courses">Courses</a></li>
          <li><a href="#attendance">Attendance</a></li>
          <li><a href="#examinations">Examinations</a></li>
          <li><a href="#financials">Financials</a></li>
          <li><Link to="/login" className={styles.loginBtn}>Login</Link></li>
        </ul>
      </nav>

      <section id="intro" className={styles.introSection}>
        <div className={styles.introContent}>
          <h2>Welcome to CampusConnect</h2>
          <p>Your one-stop platform to manage all academic and administrative operations efficiently.</p>
        </div>
      </section>

      <section id="admissions" className={styles.section}>
        <h2>Admissions</h2>
        <p>Manage student admissions with ease. From application submission to acceptance, streamline the entire process.</p>
        <img src="/images/admissions.webp" alt="Admissions" />
      </section>

      <section id="students" className={styles.section}>
        <h2>Students</h2>
        <p>Access and manage student information, including profiles, records, and academic progress.</p>
        <img src="/images/students.avif" alt="Students" />
      </section>

      <section id="courses" className={styles.section}>
        <h2>Courses</h2>
        <p>Browse and manage the list of available courses, course registration, and academic curriculum.</p>
        <img src="/images/cou.jpg" alt="Courses" />
      </section>

      <section id="attendance" className={styles.section}>
        <h2>Attendance</h2>
        <p>Track and manage student attendance for various courses and subjects.</p>
        <img src="/images/attendance.jpg" alt="Attendance" />
      </section>

      <section id="examinations" className={styles.section}>
        <h2>Examinations</h2>
        <p>Manage and view examination schedules, results, and student performance.</p>
        <img src="/images/exam.avif" alt="Examinations" />
      </section>

      <section id="financials" className={styles.section}>
        <h2>Financials</h2>
        <p>Monitor and manage student fees, payments, and financial transactions.</p>
        <img src="/images/financials.webp" alt="Financials" />
      </section>

      <footer className={styles.footer}>
        <p>© 2024 CampusConnect. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
