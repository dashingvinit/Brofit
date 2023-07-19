import { chest, leg, back, bicep, tricep, shoulder } from '../assets/images';

export const neon = '#e0fe10';
export const bgColor = '#1c2227';
// export const bgColor = 'black';
export const bgLight = 'rgba(42, 47, 55, .8)';
export const margin = 10;

export const Workouts = [
  {
    id: 1,
    title: 'Chest',
    image: chest,
  },
  {
    title: 'bicep',
    image: bicep,
  },
  {
    title: 'leg',
    image: leg,
  },
  {
    title: 'back',
    image: back,
  },
  {
    title: 'tricep',
    image: tricep,
  },
  {
    title: 'shoulder',
    image: shoulder,
  },
];
export const WorkoutPlanData = [
  {
    id: '1',
    title: 'Day 1',
    content: 'Shoulders, Chest, and Core',
    bg: 'grade1',
    exercises: [
      {
        name: 'Barbell Shoulder Press',
        reps: '10-12',
        sets: '4',
        lottieFile: 'exercise1.json',
      },
      {
        name: 'Bench Press',
        reps: '8-10',
        sets: '4',
        lottieFile: 'exercise2.json',
      },
      {
        name: 'Dumbbell Flyes',
        reps: '12-15',
        sets: '3',
        lottieFile: 'exercise3.json',
      },
      {
        name: 'Plank',
        reps: '30 seconds',
        sets: '3',
        lottieFile: 'exercise4.json',
      },
      {
        name: 'Russian Twists',
        reps: '15-20',
        sets: '3',
        lottieFile: 'exercise5.json',
      },
    ],
  },
  {
    id: '2',
    title: 'Day 2',
    content: 'Legs and Back',
    bg: 'grade2',
    exercises: [
      {
        name: 'Squats',
        reps: '8-10',
        sets: '4',
        lottieFile: 'exercise6.json',
      },
      {
        name: 'Deadlifts',
        reps: '6-8',
        sets: '4',
        lottieFile: 'exercise7.json',
      },
      {
        name: 'Leg Press',
        reps: '10-12',
        sets: '3',
        lottieFile: 'exercise8.json',
      },
      {
        name: 'Pull-ups',
        reps: '6-8',
        sets: '4',
        lottieFile: 'exercise9.json',
      },
      {
        name: 'Bent-over Rows',
        reps: '8-10',
        sets: '4',
        lottieFile: 'exercise10.json',
      },
    ],
  },
  {
    id: '3',
    title: 'Day 3',
    content: 'Arms and Shoulders',
    bg: 'grade3',
    exercises: [
      {
        name: 'Bicep Curls',
        reps: '10-12',
        sets: '4',
        lottieFile: 'exercise11.json',
      },
      {
        name: 'Tricep Dips',
        reps: '8-10',
        sets: '4',
        lottieFile: 'exercise12.json',
      },
      {
        name: 'Lateral Raises',
        reps: '12-15',
        sets: '3',
        lottieFile: 'exercise13.json',
      },
      {
        name: 'Hammer Curls',
        reps: '10-12',
        sets: '3',
        lottieFile: 'exercise14.json',
      },
      {
        name: 'Overhead Tricep Extension',
        reps: '10-12',
        sets: '3',
        lottieFile: 'exercise15.json',
      },
    ],
  },
  {
    id: '4',
    title: 'Day 4',
    content: 'Cardio and Core',
    bg: 'grade1',
    exercises: [
      {
        name: 'Running',
        reps: '20 minutes',
        sets: '1',
        lottieFile: 'exercise16.json',
      },
      {
        name: 'Jump Rope',
        reps: '1 minute',
        sets: '3',
        lottieFile: 'exercise17.json',
      },
      {
        name: 'Bicycle Crunches',
        reps: '15-20',
        sets: '3',
        lottieFile: 'exercise18.json',
      },
      {
        name: 'Mountain Climbers',
        reps: '12-15',
        sets: '3',
        lottieFile: 'exercise19.json',
      },
      {
        name: 'Hanging Leg Raises',
        reps: '10-12',
        sets: '3',
        lottieFile: 'exercise20.json',
      },
    ],
  },
  {
    id: '5',
    title: 'Day 5',
    content: 'Full Body Workout',
    bg: 'grade2',
    exercises: [
      {
        name: 'Burpees',
        reps: '10-12',
        sets: '3',
        lottieFile: 'exercise21.json',
      },
      {
        name: 'Kettlebell Swings',
        reps: '15-20',
        sets: '3',
        lottieFile: 'exercise22.json',
      },
      {
        name: 'Push-ups',
        reps: '10-12',
        sets: '4',
        lottieFile: 'exercise23.json',
      },
      {
        name: 'Jumping Jacks',
        reps: '1 minute',
        sets: '3',
        lottieFile: 'exercise24.json',
      },
      {
        name: 'Bodyweight Squats',
        reps: '12-15',
        sets: '4',
        lottieFile: 'exercise25.json',
      },
    ],
  },
  {
    id: '6',
    title: 'Day 6',
    content: 'Legs and Core',
    bg: 'grade3',
    exercises: [
      {
        name: 'Dumbbell Lunges',
        reps: '10-12',
        sets: '3',
        lottieFile: 'exercise26.json',
      },
      {
        name: 'Romanian Deadlifts',
        reps: '8-10',
        sets: '4',
        lottieFile: 'exercise27.json',
      },
      {
        name: 'Leg Curls',
        reps: '12-15',
        sets: '3',
        lottieFile: 'exercise28.json',
      },
      {
        name: 'Crunches',
        reps: '15-20',
        sets: '3',
        lottieFile: 'exercise29.json',
      },
      {
        name: 'Plank',
        reps: '1 minute',
        sets: '3',
        lottieFile: 'exercise30.json',
      },
    ],
  },
];
