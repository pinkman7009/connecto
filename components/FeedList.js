import React from 'react';
import styles from '../styles/Feed.module.css';
import PostCard from './PostCard';
import EventCard from './EventCard';

const FeedList = () => {
  const feed = [
    {
      type: 'event',
      title: 'Full-Stack Development Workshop',
      by: 'IIT Bombay',
      time: '21st April, 10am to 4pm',
      people: '52',
    },
    {
      type: 'post',
      title: 'Mistakes to avoid in First Year of college',
      by: 'Aditya Das',
      college: 'SRM Institute of Science and Technology',
      time: '3:45pm, Sunday',
      likes: 5,
      dislikes: 2,
    },
    {
      type: 'event',
      title: '24 Hour Hackathon - Prizes and Certificates',
      by: 'VIT University',
      time: '21st April, 10am to 22nd April,10am',
      people: '38',
    },
    {
      type: 'post',
      title: 'Resources for Machine Learning',
      by: 'Shreya Agarwal',
      college: 'Bits Pilani',
      time: '4:35pm, Friday',
      likes: 15,
      dislikes: 2,
    },
    {
      type: 'post',
      title: 'Best societies to join in VIT University',
      by: 'Rohan Sharma',
      college: 'VIT University',
      time: '3:20pm, Wednesday',
      likes: 25,
      dislikes: 4,
    },
    {
      type: 'event',
      title: '26 Hour Hackathon - Prizes and Certificates',
      by: 'SRM University',
      time: '18th April, 10am to 20nd April,10am',
      people: '57',
    },
  ];
  return (
    <div className={styles.feedlist}>
      {feed.map((item) =>
        item.type === 'event' ? (
          <EventCard event={item} />
        ) : (
          <PostCard post={item} />
        )
      )}
    </div>
  );
};

export default FeedList;
