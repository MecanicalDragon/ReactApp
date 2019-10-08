package net.medrag.ReactApp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * {@author} Stanislav Tretyakov
 * 17.09.2019
 */
@Controller
public class PageController {

    @GetMapping("/")
    public String index(){
        return "index.html";
    }

    @GetMapping("/page1")
    public String first(){
        return "index.html";
    }

    @GetMapping("/page2")
    public String second(){
        return "index.html";
    }

    @GetMapping("/page3")
    public String third(){
        return "index.html";
    }

    @GetMapping("/login")
    public String login(){
        return "index.html";
    }

    @GetMapping("/denied")
    public String denied(){
        return "index.html";
    }
}
