package net.medrag.ReactApp;

import org.junit.Assert;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

/**
 * {@author} Stanislav Tretyakov
 * 25.09.2019
 */
public class FirstPage {
    private WebDriver webDriver;
    private WebDriverWait wait;

    @FindBy(id = "nameInput")
    private WebElement nameInput;

    @FindBy(id = "surnameInput")
    private WebElement surnameInput;

    @FindBy(id = "firstSubmit")
    private WebElement firstSubmit;

    @FindBy(className = "notification-message")
    private WebElement notification;

    public FirstPage(WebDriver webDriver) {
        this.webDriver = webDriver;
        wait = new WebDriverWait(webDriver, 100);
        PageFactory.initElements(webDriver, this);
    }

    /**
     * This method tests 'First page'
     *
     * @param name
     * @param surname
     * @throws InterruptedException
     */
    public void test01(String name, String surname) throws InterruptedException {

//        wait until all required elements will be loaded
        wait.until(ExpectedConditions.visibilityOf(nameInput));
        wait.until(ExpectedConditions.visibilityOf(surnameInput));
        wait.until(ExpectedConditions.visibilityOf(firstSubmit));

//        fill and submit form
        nameInput.sendKeys(name);
        surnameInput.sendKeys(surname);
        firstSubmit.click();

//        assert that form is submitted
        Thread.sleep(1000);
        Assert.assertEquals(surname + "\n" + name, notification.getText());
    }

}
