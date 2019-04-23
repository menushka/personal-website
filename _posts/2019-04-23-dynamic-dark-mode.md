---
title: "Dynamic Dark Mode"
---

In the previous post, I made it clear that I wasn't gonna work on the dark mode for the site till my exams were finished.  Funny enough, right after publishing that post rather than studying, I immediately started a new feature branched and got to work implementing dark mode.  Two commits later and I had the basic implementation of a dynamically changing dark mode completed, only in the span of about 6 hours of research and coding.  All that was left was fine tuning and minor stylistic changes to finish, all of which I completed after my exams were finished.

The first step to starting this feature was the physical switch that activated and deactivated Dark Mode.  In my head, I imagined the dark mode being a persistent state that could be toggleable from any page on the website.  Therefore the best choice for the job was a toggle switch place on the the sidebar.  After adding the switch, I implemented some basic Javascript to keep the switch's state persistent between refreshes using LocalStorage.

Next came the difficult part, the actual switching two and from dark mode.  The original fork of the [personal-website](https://github.com/github/personal-website) repo from [@github](https://github.com/github) actually came bundled with their very own dark mode.  Unfortunately, this was a static setting, meaning if you wanted to switch between light or dark mode the entire site needed to be re-rendered by [Jekyll](https://jekyllrb.com/).  Of course this didn't work for my use case, so I had to think of a different way to accomplish my task.  On top of that, I didn't really like some of the color and design choices made in the original dark mode, so for my version I made a few alterations.

The way I decided to accomplish dynamic switching between light and dark mode was by simply adding and removing CSS classes.  Luckily [Primer](https://primer.style/), the CSS library that GitHub uses, had very nicely organized color classes that were used for coloring their HTML.  Therefore this became a simple matter of switching out those classes with classes of my own.  After creating the dark mode classes and wrote a quick Javascript function that would cycle through pairs of class names and replace one with the other.  I wrote the function knowing that the function would both have to switch from light to dark and from dark to light, as there was no point writing two functions that did the same operation.

{% highlight2 javascript "The light/dark switching function that switches pairs of CSS classes" %}
function switchMode(darkMode, animated) {
  const switchingClasses = {
    '': [
      // Background colors
      ['bg-white', 'bg-gray-dark'],
      ['bg-gray-light', 'bg-gray-super-dark'],

      // etc...
    ],
    '.highlight': [
      // Code syntax colors
      ['pre', 'dark-pre'], 
      ['token', 'dark-token']
    ]
  };

  for (let parent in switchingClasses) {
    if (!switchingClasses.hasOwnProperty(parent)) continue;
    
    for (let classSwitch of switchingClasses[parent]) {
      const class1 = classSwitch[darkMode ? 0 : 1];
      const class2 = classSwitch[darkMode ? 1 : 0];
      $((parent + ' .' + class1).trim()).each(function() {
        if (animated) {
          $(this).css('transition', '0.3s');
        } else {
          $(this).css('transition', '');
        }
        if (!$(this).hasClass('ignore-dark-mode')) $(this).removeClass(class1).addClass(class2);
      });
    } 
  }
}
{% endhighlight2 %}

The main functionality was completed and all that was left were the small minor details that need to be ironed out. First fixing [Barba.js](https://barba.js.org/v1/how-it-works.html), which was incorrectly loading the light version of the content while the site was in dark mode.  Barba.js was loading the raw HTML that was saved on the server, but this contented need to be converted to the proper theme before displaying it to the user.  This can be easily accomplished by adding my switching function to the 'fadeIn' event of the Barba.js script.

The second annoying issue was the 'flashing' effect upon refreshing the page in Dark Mode.  Chrome would request and display the webpage before my darkMode.js could run and switch the theme.  This would result in a rather unsettling flash of white when refreshing the page while in Dark Mode.  My solution was to hide the contents of the screen until the the script is finished running and afterwards displaying the contents.

Finally came the task of switching the colors for my code blocks.  After trying a few color schemes that were included with [Pygments](http://pygments.org/), my current syntax highlighter, I wasn't really happy with any of them.  Also I found the highlighting done by the script was very lazy, especially highlighting Javascript, constantly misrepresenting strings and variables.  Seeing as I was using GitHub's template for a personal website, I thought I might as well use the same syntax highlighter as them as well.  Unfortunately, after some research it seems their solution, Prettylights, is close-source for the time being according to [this thread](https://github.com/github/pages-gem/issues/160).  So I settled on using [Prism.js](https://prismjs.com/), a lightweight and customizable syntax highlighter.  Using the highlighter, I fashioned a theme that was as close to GitHub's light theme as possible and used their included Okaidia theme for the dark theme.

{% include figureImage.html src="/assets/blog/darkModeExample.gif" description="Example of dynamically switching between light and dark mode." %}

After finally finishing the feature, I myself actually preferred the dark version of the site over the light.  The thought of replace the site entirely with a dark theme did cross my mind at one point.  But at the end of the day, I thought I might as well keep it for the one person in the world that prefers a light theme over a dark.  Right now, I've have two weeks off of school before the next semester starts and my life devolves into chaos again.  For the time being, I'm done with the website but I definitely have things I wanna change about it in the future.  There are a few personal projects I wanna work on, so I'll definitely be busy.  Hopefully I'll find some time to update the blog from time to time, but until then enjoy the dark mode.
