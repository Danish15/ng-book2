export {environment} from './environment';
import {Injectable, Component} from '@angular/core';

@Injectable()
class Article {
    title: string;
    link: string;
    votes: number;


    constructor(title: string, link: string, votes?: number) {
        this.title = title;
        this.link = link;
        this.votes = votes || 0;
    }

    voteUp(): void {
        this.votes += 1;
    }

    voteDown(): void {
        this.votes -= 1;
    }


    domain() {
        try {
            const link: string = this.link.split('//')[1];
            return link.split('/')[0];
        } catch (err) {
            return null;
        }
    }

}







@Component({
    selector: 'my-header',
    template: `<div class = 'ui menu'>
    <div class = 'ui container'>
    <a href = '#' class = 'header item'><img class = 'logo' src = 'https://www.ng-book.com/images/ng2/ng-book-2-minibook.png' /> ng-book2 </a>
<div class='header item borderless'>
<h1 class = 'ui header'>
Angular 2 reddit clone </h1>
</div>
</div>
`
})
class Header {

}

@Component ({
    selector: 'add-article',
    inputs: ['onAddArticle'],
    template: `
    <form
        (ngSubmit)='addArticle(newtitle, newlink)'
         class='ui large form segment'>
        <h3 class='ui header'>Add a link</h3>
    
    <div class='field'>
        <label for='title'>Title:</label>
        <input name='title' 
        #newtitle/>
    </div>
 
  <div class='field'>
        <label for='link'>Link:</label>
        <input name='link'
        #newlink />
    </div>

    <input type='submit'
        value='Submit link'
        class= 'ui positive right floated button' />
    </form>
    `


})
class AddArticleComponent{
    onAddArticle: Function;


    addArticle(newtitle:HTMLInputElement, newlink:HTMLInputElement) {
        const article = new Article(newtitle.value, newlink.value);
        this.onAddArticle(article);

        newtitle.value = '';
        newlink.value = '';

    }

}





@Component({
    selector: 'article-component',
    template: `
    <div class = 'four wide column center aligned votes'>
        <div class = 'ui statistic'>
            <div class = 'value'>{{article.votes}}</div>
            <div class = 'label'>Points</div>
        </div>
        </div>
        <div class ='twelve wide column'>
            <a class = 'ui header large' href='{{article.link}}'>
                {{article.title}}
            </a>
        <div class='meta'>({{  article.domain() }})</div>
        <ul class = 'ui big horizontal list voters'>
        <li class='item'>
            <a href (click)='voteUp()'>
                <i class = 'arrow up icon'></i>
                Upvote
            </a>      
            <a href (click)='voteDown()'>
                <i class = 'arrow down icon'></i>
                Downvote
            </a>   
            </li>
            </ul>
            </div>   
      `,
    inputs: ['article'],
    host: {
        class: 'row'
    }
})

class ArticleComponent {
    article: Article;

    voteUp(): boolean {
        this.article.voteUp();
        return false;
    }

    voteDown(): boolean {
        this.article.voteDown();
        return false;
    }

}


@Component({
    selector: 'my-app',
    directives: [Header, ArticleComponent, AddArticleComponent],
    providers: [Article],
    template: ` 
    <my-header></my-header>
    <div class ='ui main text container'>
    <add-article 
    [onAddArticle]='onAddArticleCallback'></add-article>
    <div class = 'ui grid posts'>
    <article-component 
    *ngFor='let article of sortedArticles()'
    [article] = 'article'>
    </article-component>
    </div>
    </div>
    `
})
export class AppComponent {

    articles: Article[];

    onAddArticleCallback: Function;




    constructor() {
        this.articles = [
            new Article('ng-newsletter', 'http://ng-newsletter.com'),
            new Article('ng-book-2', 'http://ng-book.com/2'),
            new Article('Google', 'http://google.com'),
        ];

        this.onAddArticleCallback = 
        this.onAddArticle.bind(this);

    }

    onAddArticle(article:Article):void {
        this.articles.push(article);
    }

    sortedArticles(): Article[] {
        return this.articles
            .sort((a: Article, b: Article) => b.votes - a.votes);
    }

}



