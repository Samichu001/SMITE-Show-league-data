<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/jszip.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/xlsx.js"></script>
<script>
  const ExcelToJSON = function () {
    const parseExcel = function (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        try {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });

          workbook.SheetNames.forEach(function (sheetName) {
            // Aquí está tu objeto
            const XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            const json_object = JSON.stringify(XL_row_object);
            console.log(json_object);
          });
        } catch (error) {
          console.error('Error al procesar el archivo Excel:', error);
        }
      };

      reader.onerror = function (ex) {
        console.error('Error durante la lectura del archivo:', ex);
      };

      reader.readAsBinaryString(file);
    };

    return {
      parseExcel: parseExcel
    };
  };

  // Uso del código
  const excelParser = new ExcelToJSON();
  const inputFile = document.getElementById('tuInputFile'); // Asegúrate de tener un elemento de entrada de archivo en tu HTML con el id 'tuInputFile'
  inputFile.addEventListener('change', function () {
    const file = inputFile.files[0];
    if (file) {
      excelParser.parseExcel(file);
    } else {
      console.error('No se seleccionó ningún archivo.');
    }
  });
</script>
