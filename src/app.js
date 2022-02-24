const { json, urlencoded } = require("express");

const express = require("express");
const { Server } = require("socket.io");

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log("listening");
});
const io = new Server(server);

app.set("views", "./views");
app.set("view engine", "ejs");

const fs = require("fs"); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"))

let pathToProducts = "products.json";

//post form

app.post("/products", async (req, res) => {
  let product = req.body;

  if (!product.name || !product.price) {
    return { status: 400, message: "missing fields" };
  }

  try {
    if (fs.existsSync(pathToProducts)) {
      let data = await fs.promises.readFile(pathToProducts, "utf-8");
      let parsedProducts = JSON.parse(data);
      let idd = parsedProducts[parsedProducts.length - 1].id + 1;
      product.id = idd;
      parsedProducts.push(product);
      await fs.promises.writeFile(pathToProducts,JSON.stringify(parsedProducts, null, 2));
      
      return { status: 200, message: "user created" };
    } else {
      product.id = 1;
      await fs.promises.writeFile(pathToProducts, JSON.stringify([product], null, 2));
      return { status: 200, message: "user created" };
    }
  } catch (error) {
    return { status: 400, message: error };
  }
});
//mostrar pagina principal

app.get("/", async (req, res) => {
  if (fs.existsSync(pathToProducts)){    
      socket.on("newProductEntered",async()=>{
      let productArray=JSON.parse(await fs.promises.readFile(pathToProducts,"utf-8"))
      res.render("index",{productArray:productArray})
    })
  }

    res.render("index",{productArray:null})
});


//chatbox

io.on("connection",(socket)=>{
  socket.broadcast.emit("newUser")
})

