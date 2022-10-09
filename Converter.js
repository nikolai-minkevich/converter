

const currencies = {
    cur_try: 18,
    cur_rub: 60,
}

let lastUpdated = '';

function OnStart()
{
    updateCurrencies();
    
	lay = app.CreateLayout( "Linear", "VCenter,FillXY" )

	txtLira = app.CreateText( "₺")
	txtLira.SetTextSize( 32 )
	lay.AddChild( txtLira )
	
	edtLira = app.CreateTextEdit( "", 0.6, 0.05, "numbers")
	edtLira.SetTextColor( "#000000" )
	edtLira.SetBackColor( "#ffffff" )
	edtLira.SetText('0')
	edtLira.SetOnChange( edtLira_OnChange )
	lay.AddChild( edtLira )
	
	txtRub = app.CreateText( "₽" )
	txtRub.SetTextSize( 32 )
	lay.AddChild( txtRub )
	
	edtRub = app.CreateTextEdit( "", 0.6, 0.05, "numbers" )
	edtRub.SetTextColor( "#000000" )
	edtRub.SetBackColor( "#ffffff" )
	edtRub.SetText('0')
	edtRub.SetOnChange( edtRub_OnChange )
	lay.AddChild( edtRub )
	
	txtEuro = app.CreateText( "€" )
	txtEuro.SetTextSize( 32 )
	lay.AddChild( txtEuro )
	
	edtEuro = app.CreateTextEdit( "", 0.6, 0.05, "numbers" )
	edtEuro.SetTextColor( "#000000" )
	edtEuro.SetBackColor( "#ffffff" )
	edtEuro.SetText('0')
	edtEuro.SetOnChange( edtEuro_OnChange )
	lay.AddChild( edtEuro )
		
	app.AddLayout( lay )
}


function edtLira_OnChange (){
  let a = edtLira.GetText() 
  edtEuro.SetText( Math.round(a / currencies.cur_try) )
  edtRub.SetText( Math.round(edtEuro.GetText() * currencies.cur_rub ))
}

function edtEuro_OnChange (){
  let a = edtEuro.GetText() 
  edtLira.SetText( a * currencies.cur_try )
  edtRub.SetText( a * currencies.cur_rub )
}

function edtRub_OnChange (){
  let a = edtRub.GetText() 
  edtEuro.SetText( a / currencies.cur_rub )
  edtLira.SetText( edtEuro.GetText() * currencies.cur_try )
}

function updateCurrencies(){
    fetchCurrency(['try', 'rub']);
}

function fetchCurrency(currencyNames){
    const address = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json";

    app.HttpRequest( "GET", address, null, null, handleReply );
    
    function handleReply( error, reply )
    {
        if( error ) {
            app.ShowPopup( reply );
        }
        else
        {
            if (reply) {
                const currencyData = JSON.parse(reply);
                currencyNames.map(cur => {
                    currencies[`cur_${cur}`] = currencyData.eur[cur];
                })
                lastUpdated = currencyData.date;
                app.ShowPopup('exchange rates updated ' + lastUpdated)
            }
        }
    }
}




