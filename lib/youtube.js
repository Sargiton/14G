import axios from "axios";
import cheerio from "cheerio";

// Función para descargar desde MusicalDown (para TikTok)
export function ttdl(url) {
  return new Promise(async (resolve, reject) => {
    const response = await axios.get('https://musicaldown.com/id');
    const $ = cheerio.load(response.data);
    let formData = [];
    $("form").find("input").get().map(input => {
      formData.push({
        'name': $(input).attr("name"),
        'value': $(input).attr("value")
      });
    });

    const videoUrl = new URL(url);
    axios({
      'method': 'POST',
      'url': "https://musicaldown.com/id/download",
      'data': formData[0].name + '=' + encodeURIComponent(videoUrl.origin + videoUrl.pathname) + '&' + formData[1].name + '=' + formData[1].value + '&' + formData[2].name + '=' + formData[2].value,
      'headers': {
        'Content-Type': "application/x-www-form-urlencoded",
        'User-Agent': "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
        'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        'Origin': "https://musicaldown.com",
        'Referer': "https://musicaldown.com/id",
        'Cookie': response.headers["set-cookie"]
      }
    }).then(downloadResponse => {
      axios({
        'method': 'POST',
        'url': "https://musicaldown.com/id/mp3",
        'headers': {
          'User-Agent': "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
          'Cookie': response.headers["set-cookie"]
        }
      }).then(({ data: mp3Data }) => {
        const $downloadPage = cheerio.load(downloadResponse.data);
        const $mp3Page = cheerio.load(mp3Data);
        let videoLinks = [];
        let audioLinks = [];
        let metadata = {};

        $downloadPage("a[target='_blank']").get().map(link => {
          videoLinks.push($downloadPage(link).attr("href"));
        });

        $mp3Page("a.waves-effect").get().map(link => {
          audioLinks.push($downloadPage(link).attr('href'));
        });

        metadata.title = $downloadPage("title").text().trim();
        metadata.title_audio = $mp3Page("title").text().split(" |")[0];
        metadata.thumbnail = $downloadPage("img.responsive-img").attr("src");
        metadata.video = videoLinks.filter(link => link.includes("/video/"));
        metadata.audio = audioLinks.filter(link => {
          if (!/https:\/\//.test(link)) {
            return;
          }
          return link;
        });
        metadata.creator = "@TioXd";

        resolve(metadata);
      }).catch(reject);
    }).catch(reject);
  });
}

// Función para descargar desde DownloadGram (para Instagram)
export async function igdl(url) {
  return new Promise(async (resolve, reject) => {
    try {
      let postData = {
        'url': url,
        'submit': ''
      };

      axios("https://downloadgram.org/", {
        'method': 'POST',
        'data': new URLSearchParams(Object.entries(postData)),
        'headers': {
          'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.46",
          'cookie': "_ga=GA1.2.2121395638.1671172225; _gid=GA1.2.519005301.1671172225; __gads=ID=e8410c1ba2d24a2d-22a64184ebd800f4:T=1671172219:RT=1671172219:S=ALNI_Mb1AgoUIMTEUaH7QfenBiIcWRELPg; __gpi=UID=00000b914d13b7b4:T=1671172219:RT=1671172219:S=ALNI_MZgo_0w4Isg0hciJVVVjg4RKcl1Pg; __atuvc=5%7C50; __atuvs=639c1080f62ec79d004; _gat_gtag_UA_142480840_1=1; FCNEC=%5B%5B%22AKsRol_PHRocR55hohw-JKbsqqpOx2xRcc645IImzRbkPjvUNzvwUqhcVVIfIDT7C6K_uwGWhqhVk-bAQC0bdKMBlkhj2nhPpDB5sjKqbw8fGdof8FkpatvwsibBPVnx1ekvZnLk29coUmy59u5TSez4HH8_1SNv1Q%3D%3D%22%5D%2Cnull%2C%5B%5D%5D"
        }
      }).then(({ data }) => {
        const $ = cheerio.load(data);
        let downloadLinks = [];
        $("#downloadhere > a").each(function (index, link) {
          downloadLinks.push($(link).attr('href'));
        });

        if (downloadLinks.every(link => link === undefined)) {
          return resolve("Result Not Found! Check Your Url!");
        }

        resolve({
          'wm': "TioXd && Erlan",
          'result_count': downloadLinks.length,
          'url': downloadLinks
        });
      }).catch(() => {
        resolve("Server Error! Request Failed With Code 401!");
      });
    } catch (error) {
      resolve(error);
    }
  });
}
