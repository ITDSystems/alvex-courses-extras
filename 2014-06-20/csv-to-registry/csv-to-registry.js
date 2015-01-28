// Запускать в Javascript Console, отредактировав по мере необходимости

// Получаем csv файл из репозитория
var csv = search.findNode("workspace://SpacesStore/2c3f2d13-c741-4e98-94e1-18ddcacaba54");

// Получаем нужный реестр. В данном примере используется реестр кастомного типа:
// http://ru.blog.itdhq.com/post/70277827209/2013-12-17-create-new-registry-type
var registry = search.findNode("workspace://SpacesStore/063d0dd4-9559-4a30-93d8-97894e91855e");

// Так как csv - это plain text, получаем его содержимое просто из свойства
var data = csv.content;

// Читаем файл по строкам
for each( var line in data.split("\n") )
{
  // Разбиваем строку на поля
  var fields = line.split(",");
  // Смысл полей устанавливается руками после размышлений мозгом 
  var id = fields[0];
  var company = fields[1];
  var vendor = fields[2];
  var discount = parseInt(fields[3]);
  var summary = fields[4];
  
  // Создаем новый объект реестра
  var node = registry.createNode(null, "alvexcoursedocs:document_partner_agreement");
  // Заполняем поля
  node.properties["alvexdt:id"] = id;
  node.properties["alvexdt:company"] = company;
  node.properties["alvexdt:contractor"] = company;
  node.properties["alvexcoursedocs:vendorCompanyName"] = vendor;
  node.properties["alvexcoursedocs:partnerDiscount"] = discount;
  node.properties["alvexdt:agreementSummary"] = summary;
  // Сохраняем объект
  node.save();
}
