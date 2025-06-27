import db from 'module/index.js';

let getHomepage = (req, res) => {
  res.render('homepage.ejs', {

  });
};
 let getAboutpage = (req, res) => {
  res.render('test/about.ejs', {

  });
};
export default {
  getHomepage,
  getAboutpage
};
