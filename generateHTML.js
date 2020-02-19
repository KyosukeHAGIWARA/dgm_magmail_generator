var color_code = {
  '連載': '#c02929',
  '特集': '#0099fa',
  '製品レビュー': '#50af17',
  '製品ニュース': '#d8c600'
}

var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('メルマガ配信用');


// main
function main(){
  const folder = DriveApp.getRootFolder();
  const contents = {
    delivary_date: Utilities.formatDate( sheet.getRange('K6').getValue(),"JST","yyyy/MM/dd"),
    article_item: getWeeklyData(),
    banner_item: getBannerData()    
  };
  Logger.log(contents);
  return createHtmlTemplate(folder, contents);
}



function createHtmlTemplate(folder, contents) {
  Logger.log('メルマガ内容を埋め込むHTMLファイルを作成して、Google ドライブに保存する');
  
  //  過去に生成したファイルがあれば消す
  var f = folder.getFilesByName('gen_mail_magazine.html');
  while(f.hasNext()){
    var fil = f.next();
      folder.removeFile(fil);
  }
  
  //  htmlファイルをドライブのルートに生成
  const file = folder.createFile('gen_mail_magazine.html', generateHtml(contents), MimeType.HTML);
  return file;
}

//　HTMLオブジェクトを生成 コメントも強引に出力
function generateHtml(contents) {
  const t = HtmlService.createTemplateFromFile('mail_tmpl');
  t.contents = contents;
  t.evaluate();
  return t.evaluate().getContent().replace(/!--/g, '<!--');
}


// メルマガのコンテンツをスプレッドシートから読み込む
function getWeeklyData() {
  
  const key = Utilities.formatDate( sheet.getRange('K6').getValue(),"JST","yyyy/MM/dd");
  const col = 'A';
  var data = sheet.getRange('A7:A1000').getValues();

  var article_item = [];

  for(var ind=0; ind<data.length; ind++){
    //配信予定日の分だけ抜き出す
    if (data[ind][0] != '' && Utilities.formatDate( data[ind][0],"JST","yyyy/MM/dd") == key){
      var row_item = sheet.getRange(ind+7, 1, 1, 8).getValues();
      
      // 記事タイプが規定以外だとエラーで止まる
      if (!color_code[row_item[0][6]]) {
        Browser.msgBox(Utilities.formatString("%s行目 : \" %s \" は規定されていないコーナー名です。",ind+7, row_item[0][6]));
        throw new Error("コーナー名を修正してください");
      }
      
      // 記事データを格納
      article_item.push({ 
          article_type: row_item[0][6],
          article_type_color: color_code[row_item[0][6]],
          article_img: row_item[0][5],
          article_title: row_item[0][3],
          article_url: row_item[0][4]
      });
    }
  }
  
  Logger.log(article_item);
  return article_item;
}


// バナーの情報をスプレッドシートから読み込む
function getBannerData() {
  var data = sheet.getRange(3, 14, 4, 6).getValues();

  var banner_item = [];
  for(var ind=0; ind<data.length; ind++){
    if (data[ind][0] != ''){
      var row_item = data[ind];

      banner_item.push({ 
          banner1_url: row_item[0],
          banner1_img: row_item[1],
          banner1_alt: row_item[2],
          banner2_url: row_item[3],
          banner2_img: row_item[4],
          banner2_alt: row_item[5]
      });
    }
  }
  
  Logger.log(banner_item);
  return banner_item;
}


