# Char
> A React component that displays a video file as animated ascii

### See it [live](https://reidwilliams.github.io/char)

### Try it out
```shell
> npm install
> npm run dev
```

Point your browser to http://localhost:8080. Edit ```index.js``` to use your own video.

### How it works
The component renders a hidden HTML ```video``` element, and then uses a hidden ```canvas``` element to sample still frames from the video, resize them, and map them to a block of ascii characters. The component uses ```dangerouslySetInnerHTML``` to render the characters.