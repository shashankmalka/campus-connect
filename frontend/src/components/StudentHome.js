import React from "react";
import { Link } from "react-router-dom";
import styles from './StudentHome.module.css';

const StudentHome = () => {
  return (
    <div className={styles.studentHome}>
      <header className={styles.header}>
        <h1>Welcome to Student Home</h1>
        <Link to="/profile" className={styles.profileLink}>Profile</Link>
      </header>

      <div className={styles.sectionsContainer}>
        <Link to="/attendance" className={styles.section}>
          <div className={styles.sectionContent}>
            <img src="/images/at.png" alt="Attendance Icon" className={styles.sectionIcon} />
            <h2>Attendance</h2>
          </div>
        </Link>

        <Link to="/courses" className={styles.section}>
          <div className={styles.sectionContent}>
            <img src="/images/cooo.png" alt="Courses Icon" className={styles.sectionIcon} />
            <h2>Courses</h2>
          </div>
        </Link>

        <Link to="/results" className={styles.section}>
          <div className={styles.sectionContent}>
            <img src="/images/feed.png" alt="Results Icon" className={styles.sectionIcon} />
            <h2>Results</h2>
          </div>
        </Link>

        <Link to="/fee-details" className={styles.section}>
          <div className={styles.sectionContent}>
            <img src="/images/fee.png" alt="Fee Details Icon" className={styles.sectionIcon} />
            <h2>Fee Details</h2>
          </div>
        </Link>

        <Link to="/activities" className={styles.section}>
          <div className={styles.sectionContent}>
            <img src="/images/extra.png" alt="Extra Activities Icon" className={styles.sectionIcon} />
            <h2>Extra Activities</h2>
          </div>
        </Link>

        <Link to="/events" className={styles.section}>
          <div className={styles.sectionContent}>
            <img src="/images/eve.png" alt="Events Icon" className={styles.sectionIcon} />
            <h2>Events</h2>
          </div>
        </Link>
      </div>

      <footer>
        <p>© 2024 CampusConnect. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default StudentHome;
