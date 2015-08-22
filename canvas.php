<?php
require_once('conf/default_config.php');
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ja" lang="ja">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="Content-Language" content="ja" />
    <meta http-equiv="Content-Style-Type" content="text/css" />
    <meta http-equiv="Content-Script-Type" content="text/javascript" />
    <title>Canvas</title>
    <script language="javascript" src="script/draw.js"></script>
    <script language="javascript" src="script/i18next-1.7.2.min.js"></script>
    <script language="javascript" src="script/translation.js"></script>
    <script language="javascript" src="script/SketchCanvas.js"></script>
    <script language="javascript">
<?php
echo 'var showingFigureName = ';
if(isset($_GET['fname']))
	echo '"' . addslashes($_GET['fname']) . '";';
else
	echo 'null;';

echo 'var showingData = ';
if(isset($_POST['data']))
  echo '"' . str_replace(array("\r", "\n"), array('\r', '\n'), addslashes($_POST['data'])) . '";';
else
  echo 'null;';
?>
    </script>
    <script language="javascript" src="script/canvas.js"></script>
<!--    <script language="javascript" src="script/encoding.js"></script> -->
    <script src="script/js-yaml.min.js"></script>
    <style type="text/css">
<!--
@import url(http://fonts.googleapis.com/earlyaccess/notosansjapanese.css);
body{margin: 0 0 0 0; background-color: #fff0e7}
canvas{background-color: #fff}
table{background-color: #f7c0a0; border: 3px solid #7f7f7f; border-collapse: collapse}
td{background-color: #ffe0d0}
th{background-color: #e0c0a0}
td, th{padding: 10px; border: 2px solid #7f7f7f}
-->
    </style>
  </head>
  <body>
    <canvas id="canvassample" width="1024" height="640"></canvas>
    <form name="form1" method="POST" action="phplib/image.php" enctype="multipart/form-data">
      <table>
        <tr><th></th><th>Client figures</th><th>Server figures <sup>(*)</sup></th></tr>
        <tr>
          <th>Saved figures</th>
          <td>
            <select name="canvasselect"><option value="0">no select</option></select>
            <input type="button" value="Show" onclick="loadDataFromList()">
            <input type="button" value="Save (overwrite)" onclick="saveDataFromList()">
          </td>
          <td>
            Name: <select name="serverselect"><option value="0">no select</option></select>
            <input type="button" value="Show" onclick="loadDataFromServerList()">
            <input type="button" value="Upload (overwrite)" onclick="uploadDataFromServerList()">
            <input type="button" value="Delete" onclick="deleteFromServerList()"><br>
<?php if($conf['git']){ ?>
            History: <select id="historyselect"></select>
            <input type="button" value="Show Revision" onclick="loadDataFromServerHistory()"><br>
            <input type="button" value="Pull" onclick="pullServer()"> from or
            <input type="button" value="Push" onclick="pushServer()"> to:
            <input type="text" id="remote" value="">
<?php } ?>
            <br><a href="gallery.php">Gallery of server figures</a>
          </td>
        </tr>
        <tr>
          <th>New figure</th>
          <td>
            <input type="text" id="clientfname" name="clientfname" value="default">
            <input type="button" value="Save (new)" onclick="saveLocalNew()">
          </td>
          <td>
            <input type="text" id="fname" name="fname" value="default">
            <input type="button" value="Upload (new)" onclick="uploadDataNew()">
          </td>
        </tr>
      </table>
      <p style="font-size:14px">(*) Requires PHP configured server.
Also note that history will work only if Git client is set up in the server.</p>
      <p><input type="button" value="Convert to PNG Image" onclick="skcanvas.saveAsImage(document.getElementById('imageForSave'))">
        <input type="button" value="Convert to PNG Image (Server-side)" onclick="convertPNG()">
        <img id="imageForSave">(Right click on the image to save)</p>
      <p>Message:<textarea id="message" rows="3" cols="80" readonly></textarea></p>
      <p>Draw data: <input type="button" value="Load" onclick="skcanvas.loadData(document.getElementById('drawdata').value)"></p>
      <textarea id="drawdata" name="drawdata" rows="10" cols="50"></textarea><br>
      <input type="submit" value="Download server-rendered image">
    </form>
    <p>This application uses <a href="https://github.com/nodeca/js-yaml">js-yaml</a> JavaScript library.
    It's license is found in <a href="script/LICENSE">LICENSE</a> file.</p>
  </body>
</html>
