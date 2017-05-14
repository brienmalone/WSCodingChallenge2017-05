
class Product {
    constructor(name, price, description, imgSm, imgMd, imgLg) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.imgSm = imgSm;
        this.imgMd = imgMd;
        this.imgLg = imgLg;
    }
}

class Apron extends Product {
    constructor(name, price, description, imgSm, imgMd, imgLg, color, summary, dimensions, shipping) {
        super(name, price, description, imgSm, imgMd, imgLg);
        this.color = color;
        this.summary = summary;
        this.dimensions = dimensions;
        this.shipping = shipping;
    }
}

function getVariations() {
    var frenchBlueApron = new Apron('Williams-Sonoma Classic Apron', 19.95, `
    <p>A generously sized apron is a necessity in any kitchen, and 
                    ours will brighten yours with lively color. Sewn of thick cotton, it can be
                    personalized or monogrammed with up to nine characters, all the same height,
                    embroidered in your choice of color. An apron of this quality makes a welcome gift for any cook.</p>
                    <ul>
                        <li>Durable 100% cotton construction.</li>
                        <li>Adjustable neckband ensures a good fit.</li>
                        <li>Roomy front pockets hold small tools.</li>
                        <li>Machine-wash.</li>
                    </ul>`, 'french-blue-sm.jpg', 'french-blue-md.jpg', 'french-blue-lg.jpg', 'French Blue',
                     `This section is expanded. This section can be collapsed by clicking on the &quot;Expanded&quot; text. This section is expanded. This section can be collapsed by clicking on the &quot;Expanded&quot; text.This section is expanded. This section can be collapsed by clicking on the &quot;Expanded&quot; text. This section is expanded. This section can be collapsed by clicking on the &quot;Expanded&quot; text.This section is expanded. This section can be collapsed by clicking on the &quot;Expanded&quot; text. This section is expanded. This section can be collapsed by clicking on the &quot;Expanded&quot; text.This section is expanded. This section can be collapsed by clicking on the &quot;Expanded&quot; text. This section is expanded. This section can be collapsed by clicking on the &quot;Expanded&quot; text.This section is expanded. This section can be collapsed by clicking on the &quot;Expanded&quot; text. This section is expanded. This section can be collapsed by clicking on the &quot;Expanded&quot; text.`,
                     `This section covers dimensions and other information. Each variation could have different information here.`,
                     `This section has shipping information.`
                     );
    var stripedApron = new Apron('Williams-Sonoma Classic Apron', 19.95, 'This is a nice apron.', 'stripe-sm.jpg', 'stripe-md.jpg', 'stripe-lg.jpg', 'Striped', 'This is info that will be displayed in the accordion.');
    var creamApron = new Apron('Williams-Sonoma Classic Apron', 19.95, 'This is a nice apron.', 'french-blue-sm.jpg', 'french-blue-md.jpg', 'french-blue-lg.jpg', 'Cream', 'This is info that will be displayed in the accordion.');
    var salmonApron = new Apron('Williams-Sonoma Classic Apron', 19.95, 'This is a nice apron.', 'french-blue-sm.jpg', 'french-blue-md.jpg', 'french-blue-lg.jpg', 'Salmon', 'This is info that will be displayed in the accordion.');

    return [frenchBlueApron, stripedApron, creamApron, salmonApron];
}

function loadAccordionBehavior() {
	var allAccordions = document.querySelectorAll('.accordion-wrapper .twist-open .twist-header'); 
	Array.from(allAccordions).forEach(
		twistHeader => {
			twistHeader.addEventListener('click', function(){toggleAccordion(twistHeader);});
		}
	);
}

function toggleAccordion(twistHeader) {
	twistHeader.classList.toggle('twist-down-header');
	twistHeader.nextElementSibling.firstElementChild.classList.toggle('open');
	twistHeader.nextElementSibling.firstElementChild.classList.toggle('closed');
}

function buildThumbnailDisplay (products) {
	let thumbnailHtml = "";
	//build img html string
	products.forEach(
		(product,index) => {thumbnailHtml += `<img id="product-variant-${index}" src="./images/${product.imgSm}" class="thumbnail-image"> `;}
	);
	//send to screen
	document.querySelector('.thumbs').innerHTML = thumbnailHtml;
	//add onClick listener
	let allThumbnails = document.querySelectorAll('.thumbnail-image');
	Array.from(allThumbnails).forEach(
		thisThumbnail => {
			thisThumbnail.addEventListener('click', function(){selectProduct(thisThumbnail, products)});
		}
	);
}

function selectProduct(thumbnailImg, products) {
	let productIndex = thumbnailImg.getAttribute('id').substring(16);
	let allThumbnails = document.querySelectorAll('.thumbnail-image');
	//toggle off all borders
	Array.from(allThumbnails).forEach(
		thisThumbnail => {
			thisThumbnail.classList.remove('selected');
		}
	);
	//toggle on this border
	thumbnailImg.classList.add('selected');

	//display product based on index
	displayProductDetails(products[productIndex]);
	
	
	
}

function displayProductDetails (product)
{
	document.querySelector('.product-name').innerHTML = product.name + ', ' + product.color;
	document.querySelector('.breadcrumbs ul li:last-child').innerHTML = product.name + ', ' + product.color;
	document.querySelector('.hero-image').src = `./images/${product.imgMd}`;
	document.querySelector('.product-description').innerHTML = product.description;
	document.querySelector('.product-price').innerHTML = product.price;
	document.querySelector('.qty').value = 1;
	document.querySelector('.twist-open.summary .twist-body').innerHTML = product.summary;
	document.querySelector('.twist-open.dimensions .twist-body').innerHTML = product.dimensions;
	document.querySelector('.twist-open.shipping .twist-body').innerHTML = product.shipping;
}

