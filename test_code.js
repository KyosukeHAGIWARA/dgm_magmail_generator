

function contentsExampleMail() {
  return {
    article_item: [
      { 
        article_type: '特集',
        article_type_color: '#0099fa',
        article_img: 'https://www.digimart.net/magazine/img/boss_rc-10r_main.jpg',
        article_title: '【BOSS／RC-10R】Loop Stationシリーズ最新作はリズムマシンが融合した次世代ツール！',
        article_url: 'https://www.digimart.net/magazine/article/2019071103700.html'
      },
      { 
        article_type: '特集',
        article_type_color: '#0099fa',
        article_img: 'https://www.digimart.net/magazine/img/boss_rc-10r_main.jpg',
        article_title: '【BOSS／RC-10R】Loop Stationシリーズ最新作はリズムマシンが融合した次世代ツール！',
        article_url: 'https://www.digimart.net/magazine/article/2019071103700.html'
      },
      { 
        article_type: '特集',
        article_type_color: '#0099fa',
        article_img: 'https://www.digimart.net/magazine/img/boss_rc-10r_main.jpg',
        article_title: '【BOSS／RC-10R】Loop Stationシリーズ最新作はリズムマシンが融合した次世代ツール！',
        article_url: 'https://www.digimart.net/magazine/article/2019071103700.html'
      },
      { 
        article_type: '特集',
        article_type_color: '#0099fa',
        article_img: 'https://www.digimart.net/magazine/img/boss_rc-10r_main.jpg',
        article_title: '【BOSS／RC-10R】Loop Stationシリーズ最新作はリズムマシンが融合した次世代ツール！',
        article_url: 'https://www.digimart.net/magazine/article/2019071103700.html'
      }
    ]
  };
}

function testCreateHtmlTemplate() {
  //ルートフォルダに HTML ファイルを生成する
  const folder = DriveApp.getRootFolder();
  const file = createHtmlTemplate(folder, {article_item:getWeeklyData()});
  Logger.log(file.getUrl());
}

//function testGenerateHtml() {
//  Logger.log(generateHtml({article_item:getWeeklyData()}));
//}

function doTest(){
  return testCreateHtmlTemplate();
}