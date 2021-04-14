import React from 'react';
import styles from '../styles/Feed.module.css';
import { Icon, InlineIcon } from '@iconify/react';

import usersSolid from '@iconify/icons-clarity/users-solid';
const EventCard = ({ event }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.cardTag}>Event</div>
        <p className={styles.cardTitle}>{event.title}</p>
        <p className={styles.cardBody}>conducted by : {event.by}</p>

        <div className={styles.cardFooter}>
          <p>Time: {event.time}</p>
          <div className={styles.eventStats}>
            {event.people}
            <Icon
              icon={usersSolid}
              style={{ color: '#6e49ff', fontSize: '42px' }}
            />
          </div>
        </div>
      </div>
      <div className={styles.cardButtons}>
        <button className={styles.btn}>Register</button>
        <button className={styles.btn}>View Event</button>
      </div>
    </div>
  );
};

export default EventCard;
