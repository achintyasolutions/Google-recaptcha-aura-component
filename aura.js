onScriptLoaded : function(component, event, helper) {
        jQuery(function($){
            let iframe = $('.recaptchaFrame');  
            iframe = iframe[0];
            iframe.height = '150px';
        });
	},

    init: function (component, event, helper) {
        alert('in init');
        debugger;
        // origin
        
        window.addEventListener("message", function(event) {
            let hostOrigin = "https://paylinkdirect--uat--c.sandbox.vf.force.com"
            if (event.origin !==  hostOrigin) {
                return;
            } 
            
            console.log('event.data.action '+ event.data.action);
            if (event.data && event.data.action && event.data.action === 'verified') {
                debugger;
                console.log('data '+ event.data.action);
				component.set ('v.hasreCaptchaVerified', true);
                var loadFrontPage = component.find("loadFrontPage");
                var loadreCAPTCHA = component.find("loadreCAPTCHA");
                $A.util.removeClass(loadFrontPage, 'hideComponent');
                $A.util.addClass(loadreCAPTCHA, 'hideComponent');
            } else if (event.data && event.data.action && event.data.action === 'error') {
				component.set ('v.hasreCaptchaVerified', false);                                                          
            } else if (event.data && event.data.action && event.data.action === 'expired') {
                component.set ('v.hasreCaptchaVerified', false);             
            } else if (event.data && event.data.action && event.data.action === 'loaded') {
                component.set ('v.hasreCaptchaVerified', false); 
            }
            if (event.data && event.data.action && event.data.action === 'heigthChange') {
                debugger;
                let iframe = document.querySelector(".recaptchaFrame");
                //iframe = iframe[0];
                $('.recaptchaFrame').attr('height', event.data.height);
               	
            }
        }, false);

    }
