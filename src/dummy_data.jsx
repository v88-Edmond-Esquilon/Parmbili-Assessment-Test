/**
 * Default data for plants properties
 */
export const plants = [
	{
		name:  "potato" ,
		price:  10 ,
		reward:  15 ,
		timer:  20 
	},
	{
		name:  "onion" ,
		price: 15,
		reward:  25 ,
		timer:  30 
	},
	{
		name:  "carrot" ,
		price:  25 ,
		reward:  75 ,
		timer:  45 
	},
	{
		name:  "corn" ,
		price:  35 ,
		reward:  100 ,
		timer:  60 
	},
]

/**
 * The template that is use for the tiles state
 */
export const template =	{ 
	empty: true,
	tilled: false,
	planted: false,
	harvest: false,
	plant: {}
}