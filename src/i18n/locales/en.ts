import { title } from "process";

export default {
  // Common
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    retry: 'Retry',
    close: 'Close',
  },
  
  // Navigation
  nav: {
    home: 'Home',
    app: 'App',
    github: 'GitHub',
    language: 'Language',
    features: 'Features',
    howTo: 'How to',
    benefits: 'Benefits',
    tryNow: 'Try now',
  },
  
  // Hero Section
  hero: {

    title: {
      part1: 'Animate your face in ',
      highlight: 'real time',
      part2: ' with your custom avatars'
    },
    description: 'CoopTuber is a free and open source tool to animate your face with avatars directly in your browser. No installation needed and no performance worries… if your PC can handle streaming, it can handle CoopTuber.',
    tryNow: 'Try it now',
    viewOnGithub: 'View on GitHub',
    features: {
      openSource: 'Open Source',
      noInstallation: 'No installation',
      free: '100% free'
    }
  },
  
  // Meta tags
  meta: {
    title: 'CoopTuber - Animate Avatars with Your Facial Expressions',
    description: 'Real-time facial animation tool to bring avatars to life with your facial expressions.',
    keywords: 'facial animation, avatar, facial expressions, real-time, webcam, CoopTuber, live animation',
  },
  
  // Footer
  footer: {
    developBy: 'Developed by',
    madeWith: 'Made with ❤️ by the CoopTuber team',
    documentation: {
      title: 'Documentation',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      cookies: 'Cookie Policy',
      github: 'GitHub Repository',
    },
    contact: {
      title: 'Contact',
    },
    license: {
      title: 'License',
      description: 'This project is under the',
      license: 'Apache 2.0 license'
    }
  },
  
  // App
  app: {
    startCamera: 'Start Camera',
    stopCamera: 'Stop Camera',
    selectAvatar: 'Select Avatar',
    settings: 'Settings',
    loadingModel: 'Loading face detection model...',
    cameraAccessRequired: 'Camera access required',
    cameraAccessDenied: 'Camera access denied',
    cameraNotSupported: 'Your browser does not support camera access',
  },
  
  // Features Section
  features: {
    title: 'Key Features',
    description: 'A web app to animate your face in real time with your custom avatars',
    items: [
      {
        title: 'Real-time',
        description: 'Animate your avatar instantly with your webcam'
      },
      {
        title: 'Easy to use',
        description: 'Simple and intuitive setup'
      },
      {
        title: 'Customizable',
        description: 'Add your own avatars and customize them'
      },
      {
        title: 'Lightweight',
        description: 'Runs smoothly on most devices'
      },
      {
        title: 'Open Source',
        description: '100% free, open source and open source – contribute or create your own version'
      }
    ]
  },
  
  // How To Section
  howTo: {
    title: 'How to use with OBS?',
    description: 'CoopTuber no requiere integración especial con OBS. Solo sigue estos pasos:',
    steps:[
      {
        title: 'Open CoopTuber in your browser',
        description: 'Open CoopTuber in your browser',
      },
      {
        title: 'Set up your camera and avatar',
        description: 'Set up your camera and avatar',
      },
      {
        title: 'In OBS, add a new "Browser" source',
        description: 'In OBS, add a new "Browser" source',
      },
      {
        title: 'Enter the CoopTuber URL',
        description: 'Enter the CoopTuber URL',
      },
      {
        title: 'Done! Your avatar will animate with your facial expressions',
        description: 'Done! Your avatar will animate with your facial expressions',
      }
    ],
    features: ['Without plugins', 'Without installing anything', 'Without technical configurations']
  },
  
  // Benefits Section
  benefits: {
    title: 'Benefits',
    items: [
      {
        title: 'No Installations',
        description: 'No installations or external dependencies'
      },
      {
        title: 'Fast and smooth',
        description: 'Runs smoothly on most devices'
      },
      {
        title: 'Open Source',
        description: '100% free, open source and open source – contribute or create your own version'
      },
      {
        title: 'Multiplatform',
        description: 'Works on Windows, macOS, Linux'
      },
      {
        title: 'For everyone',
        description: 'Ideal for streamers, couples, friends or creative teams'
      }
    ]
  },
  
  // Open Source Section
  openSource: {
    title:'Why Open Source?',
    description:'CoopTuber was created as a tool for streamers and creators who want to stream with virtual avatars together in one place. We believe in free, transparent, and community-driven technology.',
    contribute:'You can contribute on GitHub, propose improvements or help CoopTuber reach the next level.',   
    highlight:[
      '👉 Would you like a cloud version so that it doesn\'t depend on your PC?',
      'Support us and we will get there together!'] 
  },
  
  // CTA Section
  cta: {
    title: 'Ready to get started?',
    subtitle: 'no limits, no costs, no complications',
    description: 'Start using CoopTuber now and take your streams to the next level by bringing your own animated avatars to life',
    tryNow: 'Try it now',
    viewOnGithub: 'View on GitHub',
    features: {
      noInstallation: 'No installation',
      free: '100% free',
      openSource: 'Open source'
    }
  }
};
