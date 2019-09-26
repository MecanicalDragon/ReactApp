package net.medrag.ReactApp;

import org.junit.Assert;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

/**
 * {@author} Stanislav Tretyakov
 * 24.09.2019
 */
public class Test01 {

    @Test
    public void test01() throws Exception{

//        Specify path to chromedriver of relevant version
        System.setProperty("webdriver.chrome.driver","D:/autotesting/chromedriver77.exe");
        String url = "http://localhost:9095/";
//        String url = "http://localhost:8899/";

        ChromeDriver chrome = new ChromeDriver();
        chrome.get(url);
        Assert.assertEquals("React App", chrome.getTitle());

        WebDriverWait wait = new WebDriverWait(chrome,100);
//        wait for the element rendering
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("to1button")));
//        go to first page
        chrome.findElementById("to1button").click();

//        assert that we're on the first page
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("page1header")));
        Assert.assertEquals("First page", chrome.findElement(By.id("page1header")).getText());
        Assert.assertEquals(url +"page1", chrome.getCurrentUrl());

        new FirstPage(chrome).test01("Stanislav", "Tretyakov");

//        wait for button render and go back
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("backFrom1")));
        chrome.findElementById("backFrom1").click();

//        assert that we're on the title page
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("titleHeader")));
        Assert.assertEquals("Title page", chrome.findElement(By.id("titleHeader")).getText());
        Assert.assertEquals(url, chrome.getCurrentUrl());

//        close tab
        chrome.quit();
    }
}
