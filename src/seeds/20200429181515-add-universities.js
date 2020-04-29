'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const universitiesData = [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "Pontificia Universidad Católica de Chile",
        address: "Av Libertador Bernardo O'Higgins 340, Santiago, Región Metropolitana",
        description: "La Pontificia Universidad Católica de Chile —coloquialmente conocida como «la Católica», «la Cato», «la PUC» o «la UC»— es una universidad privada tradicional de Chile, una de las trece universidades católicas en el sistema universitario chileno y de las seis universidades católicas tradicionales del país. Fue creada hace 131 años, el 21 de junio de 1888, por el arzobispado de Santiago de Chile. La Santa Sede le concedió el título de «Pontificia» en febrero de 1930. Al ser una universidad pontificia, depende directamente de la Santa Sede y de la Iglesia católica chilena, por medio del arzobispado de Santiago. Aunque no pertenece al Estado chileno, parte sustancial de su presupuesto corresponde a transferencias estatales bajo diferentes conceptos. Forma parte del Consejo de Rectores de las Universidades Chilenas (CRUCH), de la Red Universitaria Cruz del Sur (RUCS), y la Red Universitaria G9 (G9).  \
\
        Es considerada una universidad compleja, y una de las más prestigiosas de América latina puesto que desarrolla una gran actividad investigativa en numerosas áreas del saber. Su Casa Central se encuentra en la comuna de Santiago y su campus regional, en la ciudad de Villarrica (Región de la Araucanía). La Universidad está integrada por 34 escuelas e institutos agrupados en 18 facultades, además de un programa de estudios generales (College UC) y un campus regional (Villarrica), que al año 2018 ofrecían en conjunto 61 carreras, 104 programas de pregrado, 97 de magíster, 35 doctorados, 79 postítulos, 64 de ellos de especialización médica y 5 de especialidades odontológicas. Hasta 2018, los alumnos regulares eran 31 270 (26 197 de pregrado, 3160 de magíster, 1169 de doctorado y 744 de postítulo. La planta académica ascendía a 3555 docentes y el personal administrativo a 3273 funcionarios. En líneas generales esta institución cuenta con un total de 11935 empleados. \
\
        Actualmente se encuentra acreditada por la Comisión Nacional de Acreditación (CNA-Chile) por un período de 7 años (de un máximo de 7), desde diciembre de 2018 hasta diciembre de 2025. Figura en la posición 2 dentro de las universidades chilenas según la clasificación webométrica del CSIC (julio de 2017). Además está en la posición 2 según el ranking de AméricaEconomía 2016. Es una de las cuatro universidades chilenas que figuran en el Academic Ranking of World Universities, adjudicándose el lugar 2. ​Dentro de las universidades chilenas está, además, entre las 11 que figuran en la Clasificación mundial de universidades QS 2017, entre las 10 que figuran en el ranking del Times Higher Education 2017, y entre las 25 que aparecen en el ranking de Scimago Institution Rankings (SIR) 2017, con la posición 2 a nivel nacional y 462 a nivel mundial​."
       },
       {
         createdAt: new Date(),
         updatedAt: new Date(),
         name: "Universidad de Chile",
         address: "Av. Libertador General Bernardo O'Higgins 1058, Santiago, Región Metropolitana,Chile",
         description: "La Universidad de Chile es una institución de Chile, creada por ley de 19 de noviembre de 1842, e instalada el 17 de septiembre de 1843. Es una de las más antiguas del país y tanto su Casa Central como la mayoría de sus dependencias se encuentran ubicadas en la Región Metropolitana de Santiago. \n \
         Fundada luego de la reforma republicana a la colonial Real Universidad de San Felipe y establecida como su sucesora legal, es dueña de una rica historia académica, científica y de extensión, llevando a cabo acciones que buscan resolver las problemáticas nacionales y de la región y contribuyendo de modo determinante en el desarrollo de Chile desde su creación hasta nuestros días. Esta casa de estudios, ha sido reconocida como una de las mejores universidades del país debido a su liderazgo e innovación en el ámbito de la ciencia, la tecnología, las humanidades y las artes a través de las funciones de creación, extensión y docencia, enfatizando en el desarrollo de la investigación y postgrado.\n \
         Conocida como la Casa de Bello, en homenaje a su primer rector, el destacado humanista Andrés Bello, la Universidad se define como garante de una cultura clásica, humanista y secular. La Universidad de Chile es una de las 18 universidades del Consorcio de Universidades del Estado de Chile (CUECH) y una de las 27 que conforman el Consejo de Rectores de las Universidades Chilenas (CRUCH).\n \
         De sus aulas han egresado o realizado labores académicas gran cantidad de intelectuales y destacados líderes chilenos, entre los que destacan, 20 Presidentes de la República, 179 Premios Nacionales y 2 Premios Nobel.\n \
         Cuenta con 3.168.373 m² de superficie entre sus cinco campus universitarios, edificios de investigación, centros de atención de salud, museos, teatros, observatorios e infraestructura deportiva. Al año 2016, tiene más de 40 mil estudiantes de pregrado y postgrado con una oferta académica de más de 69 carreras y licenciaturas terminales, 38 programas de doctorado y 116 de magíster.\n \
         Atendiendo a su naturaleza pública realiza además una rica labor de extensión cultural a través del Teatro Nacional Chileno; sus cuerpos artísticos estables (Orquesta Sinfónica de Chile, Ballet Nacional Chileno, Camerata Vocal y Coro Sinfónico); el Museo de Arte Contemporáneo (MAC) y el Museo de Arte Popular Americano Tomás Lago, entre otras iniciativas.\n \
         Actualmente se encuentra acreditada por la Comisión Nacional de Acreditación (CNA-Chile) por un período de 7 años (de un máximo de 7), desde diciembre de 2018 hasta diciembre de 2025. Figura en la posición 1 dentro de las universidades chilenas según la clasificación webométrica del CSIC (julio de 2017). Además está en la posición 1 según el ranking de AméricaEconomía 2016.13​ Es una de las cuatro universidades chilenas que figuran en el Academic Ranking of World Universities, adjudicándose el lugar 1. Dentro de las universidades chilenas está, además, entre las 11 que figuran en la Clasificación mundial de universidades QS 2017, ​entre las 10 que figuran en el ranking del Times Higher Education 2017, y entre las 25 que aparecen en el ranking de Scimago Institution Rankings (SIR) 2017, con la posición 1 a nivel nacional y 455 a nivel mundial.",
       },
       {
         createdAt: new Date(),
         updatedAt: new Date(),
         name: "Universidad de Santiago de Chile",
         address: "Av. Libertador General Bernardo O'Higgins 3363, Santiago, Región Metropolitana, Chile",
         description: "La Universidad de Santiago de Chile (Usach) es una universidad pública de Chile, conformante del Consorcio de Universidades del Estado de Chile y al Consejo de Rectores de las Universidades Chilenas. \
         Tiene sus raíces en la Escuela de Artes y Oficios, fundada en 1849 bajo el gobierno del presidente de Chile Manuel Bulnes. En 1947 fue instaurada como Universidad Técnica del Estado, con diversas sedes a lo largo del país. Posteriormente, en 1981 y como consecuencia de la reforma de la educación superior impulsada durante la dictadura militar, la casa central de la UTE se convirtió en la actual Universidad de Santiago de Chile, con todas sus actividades centradas en un campus único de 340 000 m² ubicado en la comuna de Estación Central, en la ciudad de Santiago.\n \
         Actualmente se encuentra acreditada por la Comisión Nacional de Acreditación (CNA-Chile) por un período de 6 años (de un máximo de 7), desde octubre de 2014 hasta octubre de 2020. Figura en la posición 4 dentro de las universidades chilenas según la clasificación webométrica del CSIC (julio de 2017). Además está en la posición 5 según el ranking de AméricaEconomía 2016. Dentro de las universidades chilenas está, además, entre las 11 que figuran en la Clasificación mundial de universidades QS 2017, ​entre las 10 que figuran en el ranking del Times Higher Education 2017, y entre las 25 que aparecen en el ranking de Scimago Institution Rankings (SIR) 2017, con la posición 6 a nivel nacional y 650 a nivel mundial.",
       },
       {
         createdAt: new Date(),
         updatedAt: new Date(),
         name: "Universidad Diego Portales",
         address: "Manuel Rodríguez Sur 415, Santiago, Chile",
         description: "La Universidad Diego Portales, también conocida como UDP, es una universidad privada chilena, fundada en Santiago de Chile en 1982 y bautizada en honor al político y comerciante chileno Diego Portales Palazuelos; está adscrita al sistema único de admisión de las universidades del Consejo de Rectores (CRUCH). Elegida como la mejor universidad de Iberoamérica en la categoría de instituciones con menos de 50 años de antigüedad.\
         Actualmente se encuentra acreditada por la Comisión Nacional de Acreditación (CNA-Chile) por un período de 5 años (de un máximo de 7), desde octubre de 2018 hasta octubre de 2023. Figura en la posición 7 dentro de las universidades chilenas según la clasificación webométrica del CSIC (julio de 2017). ​Además está en la posición 10 según el ranking de AméricaEconomía 2016. Dentro de las universidades chilenas está, además, entre las 11 que figuran en la Clasificación mundial de universidades QS 2017, entre las 10 que figuran en el ranking del Times Higher Education 2017, y entre las 25 que aparecen en el ranking de Scimago Institution Rankings (SIR) 2017, con la posición 16 a nivel nacional y 705 a nivel mundial. El Ranking del THE 2018, posiciona a la UDP como primera en Chile junto a la Pontificia Universidad Católica de Chile y la Federico Santa María. Asimismo, entre las universidades con menos de 50 años, la UDP es la primera en América Latina.",
       },
  ];

  return queryInterface.bulkInsert('universities', universitiesData);

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    return queryInterface.bulkDelete('universities', null, {});
  }
};
