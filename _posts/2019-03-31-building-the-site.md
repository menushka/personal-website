---
title: "Building the site"
---

Well, I finally got around to redesigning my website, for about the fifth time.  Hopefully this time it sticks.  I'm by no means a UI or UX designer but I can definitely tell the difference between good and bad design.  So when [@github](https://github.com/github) released their [personal-website](https://github.com/github/personal-website) repo I quickly forked it to use their beautiful template as a starting place for my next website redesign.

After forking, cloning and setting up the site on my local machine, I immediately noticed a few issues.  The site wasn't that forgiving towards someone with a long name, unfortunately for me.  So I made a few modifications to the CSS, both vertically and horizontally center the information on the sidebar.  I also found the base site lacked any convenient way to visit other pages, so I added a navbar using the bundled Primer CSS library.

Following the CSS, changes the second issue I ran into was the choppy transitions between pages.  The page would do a hard reload when transitioning between pages, something I found uncomfortable to watch. For example, between the home and blog pages, the sidebar remains the same but is reloaded entirely.  To solve this, I added the [Barba.js](https://barba.js.org/v1/how-it-works.html) library, preemptively loading the next page content without reloading the page.  After configuring each page on the site with a 'wrapper' and 'container' class, the library worked flawlessly, fading content between page transitions.

{% include figureImage.html src="/assets/blog/barbaExample.gif" description="Example of Barba.js fading in content without reloading the page." %}

Overall I was happy with the site so I decided to push it, replacing my current site with the brand new version I had just created.  The production build went smoothly with the exception of a few absolute paths that needed to be corrected.  But after everything was done I noticed the process of the manually pushing to the site would eventually become tiresome, especially considering my plans to maintain a relatively active blog.  So I looked for a solution.

After looking through a few different solutions, I settled upon using Github's Webhooks.  After setting it up, I created my [personal-website-hook](https://github.com/menushka/personal-website-hook) project to automatic pull, build and deploy the latest version of my website.  When I push code to the site's master branch, usually done when merging the latest develop branch onto the master for a release, Github sends a request to my hook.  This message tells the hook to update the site, resulting in the hook running the update.sh script which handles the majority of the work.

The bash script isn't anything special, but it gets the job done.  To keep my logs nice and pretty, I suppress the output from the commands, replacing it with my own colourful and visually appealing logs.

{% highlight2 shell "Better commented and simplified version of update.sh" %}
function log() {
  output "$COLOR_GREEN$1$COLOR_NC"
}

function error() {
  output "$COLOR_RED$1$COLOR_NC"
  output $COLOR_RED"Site update failed."$COLOR_NC
  log "============================================================"
  exit 1
}

# Step 1: Pull from Github
git pull origin &> /dev/null && log "Pull successful [1/5]" || error "Pull failed."

# Step 2: Install / Update dependencies
bundle install &> /dev/null && log "Bundle install successful [2/5]" || error "Bundle install failed."

# Step 3: Build jekyll site for production
bundle exec jekyll build &> /dev/null && log "Jekyll build successful [3/5]" || error "Jekyll build failed."

# Step 4: Verify working HTML with HTMLProofer
bundle exec htmlproofer ./_site --disable-external &> /dev/null && log "HTMLProofer successful [4/5]" || error "HTMLProofer failed."

# Step 5: Copy build directory to deployment
rsync -crz "$PROJECT_ROOT/$PROJECT_BUILD_DIR/" "$DEPLOYMENT_ROOT" &> /dev/null && log "Copy with rsync to deploy folder successful [5/5]" || error "Copy with rsync to deploy folder failed."
{% endhighlight2 %}

With my site now smoothly transitioning between pages and now auto updating, I pushed a new release, frantically refreshing the live version of the site.  To my delight, the hook worked exactly as expected and the site refreshed with the updated content.

I still have a few things I wanna change about the site, but that's currently on the back burner.  First on the to-do list is dark mode (so I don't burn people's eyes out), but unfortunately, school comes first.  Exam season is right around the corner, so that will be my top priority for the time being.
