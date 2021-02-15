const pages = {
  
    home: { href: "/home", name: "home", headerTitle: "Clean Blog", headerSubtitle: "A Blog Theme by Start Bootstrap", requiresLogin: false, },
    about: { href: "/about", name: "about", headerTitle:"About Me", headerSubtitle:"This is what I do.",requiresLogin: false, },
    sample_post: { href: "/sample_post/:id", name: "sample post", headerTitle: " ", headerSubtitle: " ",requiresLogin: false, },
    contact: { href: "/contact", name: "contact",  headerTitle: "Contact Me", headerSubtitle: "Have questions? I have answers.",requiresLogin: false,  },
    new_user: { href: "/new_user", name: "new user",  headerTitle: "Register a new account", headerSubtitle: "And start posting.", requiresLogin: false,  },
    new_post: { href: "/new_post", name: "new post",  headerTitle: "Create new post", headerSubtitle: " ",requiresLogin: true,  },
    logout: { href: "/logout", name: "logout",  headerTitle: " ", headerSubtitle: " ", requiresLogin: true,  },
    login: { href: "/login", name: "login",  headerTitle: "Login", headerSubtitle: "Enter your name and password.", requiresLogin: false,  },
  
};

 const getPageInfo = page => { 
   return pages[page]; }
 


export { getPageInfo, pages};
