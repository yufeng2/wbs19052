let switcher = (function() {

    return {
        init(target) {
            let c, ctx, width, height, r, border;
        
            let on_color, off_color, circle, status;

            let animation = false;

            c = document.querySelector(target);

            c.onclick = function() {
                if (!animation) {
                    if (status == "on") {
                        status = "off";
                        switch_off();
                    } else {
                        status = "on";
                        switch_on();
                    }
                    c.setAttribute("status", status);
                }
            }

            ctx = c.getContext("2d");

            width = c.width;
            height = c.height;

            r = height / 2;

            border = height / 10;

            on_color = c.getAttribute("on_color");
            off_color = c.getAttribute("off_color");
            circle = c.getAttribute("circle");
            status = c.getAttribute("status");

            if (status == "on") {
                switch_on();
            } else {
                switch_off();
            }

            function switch_on() {
                animation = true;

                let x = r;
                let handle = setInterval(function() {
                    ctx.clearRect(0, 0, width, height);
                    
                    ctx.beginPath();
                    ctx.arc(r, r, r, 0, Math.PI * 2);
                    ctx.arc(width - r, r, r, 0, Math.PI * 2);
                    ctx.rect(r, 0, r * 2, r * 2);
                    ctx.fillStyle = on_color;
                    ctx.fill();
                    
                    ctx.beginPath();
                    ctx.arc(x, r, r - border, 0, Math.PI * 2);
                    ctx.fillStyle = circle;
                    ctx.fill();
                    
                    if (x == width - r) {
                        clearInterval(handle);
                        animation = false;
                    }
                    
                    x ++;
                }, 50);
            }
            
            function switch_off() {
                animation = true;

                let x = width - r;
                let handle = setInterval(function() {
                    ctx.clearRect(0, 0, width, height);
                    
                    ctx.beginPath();
                    ctx.arc(r, r, r, 0, Math.PI * 2);
                    ctx.arc(width - r, r, r, 0, Math.PI * 2);
                    ctx.rect(r, 0, r * 2, r * 2);
                    ctx.fillStyle = off_color;
                    ctx.fill();
                    
                    ctx.beginPath();
                    ctx.arc(x, r, r - border, 0, Math.PI * 2);
                    ctx.fillStyle = circle;
                    ctx.fill();
                    
                    if (x == r) {
                        clearInterval(handle);
                        animation = false;
                    }
                    
                    x --;
                }, 50);
            }
        }
    }
})();