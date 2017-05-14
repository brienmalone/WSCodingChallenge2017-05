//Uses ES6/2015 syntax
class Product {
    constructor(name, price, description, imgSm, imgMd, imgLg, color, summary, dimensions, shipping) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.imgSm = imgSm;
        this.imgMd = imgMd;
        this.imgLg = imgLg;
        this.color = color;
        this.summary = summary;
        this.dimensions = dimensions;
        this.shipping = shipping;
    }
}
/*
** Get product data as array of objects
*/
function getProductVariants() {
    var frenchBlueApron = new Product('Williams-Sonoma Classic Apron', 19.95, 
    				`<p>A generously sized apron is a necessity in any kitchen, and 
                    ours will brighten yours with lively color. Sewn of thick cotton, it can be
                    personalized or monogrammed with up to nine characters, all the same height,
                    embroidered in your choice of color. An apron of this quality makes a welcome gift for any cook.</p>
                    <ul>
                        <li>Durable 100% cotton construction.</li>
                        <li>Adjustable neckband ensures a good fit.</li>
                        <li>Roomy front pockets hold small tools.</li>
                        <li>Machine-wash.</li>
                    </ul>`, 
                    'french-blue-sm.jpg', 'french-blue-md.jpg', 'french-blue-lg.jpg', 'French Blue',
                     `This section is expanded. This section can be collapsed by clicking on the &quot;Expanded&quot; text. This section is expanded. This section can be collapsed by clicking on the &quot;Expanded&quot; text.This section is expanded. This section can be collapsed by clicking on the &quot;Expanded&quot; text. This section is expanded. This section can be collapsed by clicking on the &quot;Expanded&quot; text.This section is expanded. This section can be collapsed by clicking on the &quot;Expanded&quot; text. This section is expanded. This section can be collapsed by clicking on the &quot;Expanded&quot; text.This section is expanded. This section can be collapsed by clicking on the &quot;Expanded&quot; text. This section is expanded. This section can be collapsed by clicking on the &quot;Expanded&quot; text.This section is expanded. This section can be collapsed by clicking on the &quot;Expanded&quot; text. This section is expanded. This section can be collapsed by clicking on the &quot;Expanded&quot; text.`,
                     `This section covers dimensions and other information. Each variation could have different information here.`,
                     `This section has shipping information.`
                     );
                     
    var rustApron = new Product('Williams-Sonoma Classic Apron', 19.95, 'This is a nice apron.', 
    				'rust-sm.jpg', 'rust-md.jpg', 'rust-lg.jpg', 'Rust', 
    				'This is info that will be displayed in the accordion.',
    				'This appears in the dimensions. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam', 
    				'Shipping info here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
    );
    var tealApron = new Product('Williams-Sonoma Classic Apron', 19.95, 'This is a nice apron, too. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam', 
    				'teal-sm.jpg', 'teal-md.jpg', 'teal-lg.jpg', 'Teal', 
    				'This is info that will be displayed in the accordion.', 
    				'Additional information...', 
    				'Shipping stuff.'
	);
    var goldApron = new Product('Williams-Sonoma Classic Apron', 19.95, 'This is an even nicer apron. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniamLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.', 
    				'gold-sm.jpg', 'gold-md.jpg', 'gold-lg.jpg', 'Gold', 
    				'This is info that will be displayed in the accordion.',
    				'Some users of this apron have experienced temporary weightlessness. Enjoy! There is no cause for alarm.', 
    				'Shipping costs etc...'
    );

    return [frenchBlueApron, rustApron, tealApron, goldApron];
}

/*
**
*/
function addAccordionBehavior() {
	var allAccordions = document.querySelectorAll('.accordion-wrapper .twist-open .twist-header'); 
	Array.from(allAccordions).forEach(
		twistHeader => {
			//I could have avoided anonymous function syntax here, but wanted to be able to call toggleAccordion outside of this event
			twistHeader.addEventListener('click', function(){toggleAccordion(twistHeader);}); 
		}
	);
}

/*
**
*/
function toggleAccordion(twistHeader) {
	twistHeader.classList.toggle('twist-down-header');
	twistHeader.nextElementSibling.firstElementChild.classList.toggle('open');
	twistHeader.nextElementSibling.firstElementChild.classList.toggle('closed');
}

/*
** dynamically create thumbnail img tags based on products
*/
function addThumbnailDisplay (products) {
	let thumbnailHtml = "";
	//build img html string
	products.forEach(
		(product,index) => {thumbnailHtml += `<img id="product-variant-${index}" src="./images/${product.imgSm}" class="thumbnail-image"> `;}
	);
	//send to screen
	document.querySelector('.thumbs').innerHTML = thumbnailHtml;
	//add click listener
	let allThumbnails = document.querySelectorAll('.thumbnail-image');
	Array.from(allThumbnails).forEach(
		thisThumbnail => {
			thisThumbnail.addEventListener('click', function(){selectProduct(thisThumbnail, products)});
		}
	);
}

/*
** Populate page based on thumbnail selection
*/
function selectProduct(thumbnailImg, products) {
	//parse index number from img id
	let productIndex = thumbnailImg.getAttribute('id').substring(16);
	 
	//turn off all borders
	let allThumbnails = document.querySelectorAll('.thumbnail-image');
	Array.from(allThumbnails).forEach(
		thisThumbnail => {
			thisThumbnail.classList.remove('selected');
		}
	);
	//turn on this border
	thumbnailImg.classList.add('selected');

	//display product based on index
	displayProductDetails(products[productIndex]);
}

/*
** 
*/
function displayProductDetails (product)
{
	document.querySelector('.product-name').innerHTML = product.name + ', ' + product.color;
	document.querySelector('.breadcrumbs ul li:last-child').innerHTML = product.name + ', ' + product.color;
	document.querySelector('.product-description').innerHTML = product.description;
	document.querySelector('.product-price').innerHTML = product.price;
	document.querySelector('.qty').value = 1;
	document.querySelector('.twist-open.summary .twist-body').innerHTML = product.summary;
	document.querySelector('.twist-open.dimensions .twist-body').innerHTML = product.dimensions;
	document.querySelector('.twist-open.shipping .twist-body').innerHTML = product.shipping;
	document.querySelector('.hero-image').src = `./images/${product.imgMd}`;

	//re-run hero fade animation
	var oldHero = document.querySelector('.hero-image');
	var cloneHero = document.querySelector('.hero-image').cloneNode(true);
	oldHero.parentNode.replaceChild(cloneHero, oldHero );
}

/*
**
*/
function initPage() {
	//load product data
	var productVariants = getProductVariants();
	//add click behavior to accordion
	addAccordionBehavior();
	//open summary accordion by default	
	toggleAccordion(document.querySelector('.twist-open.summary .twist-header'));
	//build thumbnails
	addThumbnailDisplay(productVariants);
	//select first variant for display
	var firstVariant    = document.querySelector('#product-variant-0');
	selectProduct(firstVariant,productVariants);
}
