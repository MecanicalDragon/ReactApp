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
        return "page1.html";
    }

    @GetMapping("/page2")
    public String second(){
        return "page2.html";
    }

    @GetMapping("/page3")
    public String third(){
        return "index.html";
    }

    @GetMapping("/dnd")
    public String dnd(){
        return "index.html";
    }

    @GetMapping("/login")
    public String login(){
        return "login.html";
    }

    @GetMapping("/denied")
    public String denied(){
        return "denied.html";
    }
}
