function changeStyleFromItemsNavBar(id, items) {
  Array.from(items).map((element) => {
    if (element.id === id) {
      element.classList.add("scale-150", "drop-shadow-[0_0_10px_rgba(198,170,227,0.53)]")
      var tooltiptext = element.children[0].children[1]
      tooltiptext.classList.remove("opacity-0")
      tooltiptext.classList.add("opacity-100")
    } else {
      element.classList.remove("scale-150", "drop-shadow-[0_0_10px_rgba(198,170,227,0.53)]")
      var tooltiptext = element.children[0].children[1]
      tooltiptext.classList.remove("opacity-100")
      tooltiptext.classList.add("opacity-0")
    }
  })
}

// function updateRulesCSS(selector, propiedad, valor) {
//   for (let i = 0; i < document.styleSheets.length; i++) {
//     const hoja = document.styleSheets[i];
//     const rules = hoja.cssRules;
//     for (let j = 0; j < rules.length; j++) {
//       if (rules[j].selectorText === selector) {
//         rules[j].style[propiedad] = valor;
//         return;
//       }
//     }
//   }
// }

document.addEventListener('DOMContentLoaded', () => {
  const secciones = document.querySelectorAll("section.seccion, article.seccion")
  const items = document.querySelectorAll("li.itemNav")
  const links = document.querySelectorAll('nav a[href^="#"]')
  const emailForm = document.forms["emailForm"]

  emailForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const nombre = emailForm.elements["nombre"].value
    const apellido = emailForm.elements["apellido"].value
    const mensaje = emailForm.elements["mensaje"].value
    const email = emailForm.elements["email"].value
    const asunto = emailForm.elements["asunto"].value

    const destinatario = "bnavarrodev@gmail.com"
    const body = "Nombre: " + nombre + "%0D%0A" + 
                 "Apellido: " + apellido + "%0D%0A" +
                 "Email: " + email + '%0D%0A%0D%0A' +
                 mensaje

    window.location.href = 'mailto:' + destinatario +
                           '?subject=' + encodeURIComponent(asunto) +
                           '&body=' + encodeURIComponent(body)
  })

  if (secciones) {
    const opciones = {
      root: null,
      rootMargin: '10px',
      threshold: 0.3
    }
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()

        const targetId = link.getAttribute('href')
        const targetElement = document.querySelector(targetId)

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
          })
        }
      })
    })
    
    const observador = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        if (entry.target.id === "experienceSection") {
          changeStyleFromItemsNavBar("experience", items)
        } else if (entry.target.id === "projectsSection") {
          changeStyleFromItemsNavBar("projects", items)
        } else if (entry.target.id === "aboutMeSection") {
          changeStyleFromItemsNavBar("aboutMe", items)
        } else if (entry.target.id === "contactSection") {
          changeStyleFromItemsNavBar("contact", items)
        } else {
          changeStyleFromItemsNavBar("", items)
        }
      })
    }, opciones)

    secciones.forEach(seccion => observador.observe(seccion))
  } else {
    console.error('El elemento a observar no se encontró en el DOM');
  }

})

