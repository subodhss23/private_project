import React from 'react';
import {Helmet} from "react-helmet";

import ContactForm from './ContactForm.jsx';

// CSS
import '../../../../css/Support.css';

const Support = (props) => {
  if(process.env.REACT_APP_ENV === "production") {
    window.Intercom("update");
  }

  return (
    <div styleName="container">
        <Helmet>
          <title>Contact Us</title>
          <meta name="description" content="Want to close an account? or delete your data? We'd love to hear from you"/>
        </Helmet>
      <div styleName="left">
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="52" height="52" viewBox="0 0 52 52">
          <image id="Vector_Smart_Object" data-name="Vector Smart Object" width="52" height="52" xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACu1BMVEXySEj////ySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEgAAACJrl9yAAAA53RSTlMAAANDh77i/OrKmFUPF4Pp+Lh+UjkwNEpyp+2gLQV589JkDLP9oRUiy+hcAjjM60Y77LQEgmg38Y5U+nMfjVD7UXfydRQBv7kT8F8lSYDWwuZpbD+mjCOdEpwsKD6Ea7AGVpont7EkMbvJhrxiDh42hR1gx0JXGfk6FiYNZyo8lylurU98beT0WbWivZSRCJKy9eALChjPHG/b19X2TUeVf5s9B6QySK6liHQreHEQEdjvW5Mv/pBembr37qNFnwnfeqipXd5jiUtBe4pAYdzR0IEhTosg5bbFw3ZwxKzh01ouqjPjZefJsZj2AAAAAWJLR0ToJtR3AgAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB+IGAwMFDHwqTFAAAAR3SURBVEjHY2BAACZmFlY29ufPOTi5uHkYcABGIEDwePn4BQSFhEVExcQlJKUEpGUIa5KVk1dQVEJYKq6soqpGQJO6hqaWNqqsjq6ePl5NBoZGmMYam7Cb4tFkZm7BhM0pllbWODXZSNniCCo7ewccmow5jZhwaGJwdLLBrslZzwWXHgZXN3esmjw8vRhwA292H2yafP208Whi4PLHookpIBASUkEMDMEhobIMYeFcHgwRkZJREEXRz6MwNcVYQZNZbJxIfEJiUnKKmkxqWmq6R4Y3RDzTBFNTVjbMzzlyuQwM4iZ5DAz5BSIMDIVFEHHfYkxN7nwM+EGJgCyGJrZSAprKnodhaCqvgHAqE4BEVTWQUC8DErwQH8mmW9Y8zxKuZULV9FwUwqkTzGWoN8loYGiMbGpmYFaub2GIaGW1es7h97yt/bl8akcCsiYxqBH5nV2mDGXdPT0MCam9KX0M/RMmTrLV52GYDFRhIxzuye/cB9ekB4/xKRFAwngqkNAuc3U1NZ9mB4716c/TwLIzNGfWwTTptmLzvVKTvKkrNPRUpkAYufXsjlBNkdJY9KhxzkqGsZ1nw4Ut5/S4gjVpBUBMnDsPGHjzcxgYXEIXeHBmRsBVCi5EGCZibgvW5GK1CMxfvKSkLGO6nMRio6Vz9WYiMr+a/TIkJzBb1YBT+fIV0HBYGanOwLBqSR2D1pzVCGVr9FASxNo53iBNdewNqB5apwcvGXhs1huuAVnnDQ0MBld/N3DOdV+IqqllgzGEoZXa4yu9sYJhU+pmE9WQLRDBLVuXgTQZbUPR08e/HWLmDmeQ5lyu1EZQfEV0cUNSxPKdQE2Td5WgaGrevRhMN0pAHZQPpffUgjXt3VoILKY8UXzKoLoPTO33Ry8FysASjEx6wKy+LwRV7kAHmFp2ECPKQ0DGMDIeOszApFdaVZQ0e2LBYmiAPYdkikBLDE2hlWBN1hsY6p7LP2eTjDvSdvQYOBWnPwe71pUFU9NxF7CmZiuGnP7S6SCRyQt26/WfmMxwkgNY0aSf8lM5jaFJEuwnxjPPkcQmn001f655bmL2eYHnFy7aCBqj6bnUC9HE/BxV3Fj08pXnB02ZQUnPdBOapvneEE2WuzDccPW5B4SRwDoZRaKWCxK5jKbXMDQZsy+Cskp2IIsnXF8P1dTrjqGJ4cYaGIsFuWbon8cA1aS7ElMT300Yi6lpHlz01m0og7FsazCmJpmt6jDmFCNYsgxkgYkxWvNjqwLv9MOZU+6Ck7brAjmEn+/5MmLRdELgKpzNtJlPm2GytBZCdsZEXmyaGDKuI3G2K89TXorE9w9nxKqpVgC5LExeWY0sefo+dk0MZ9nnMeACOs8vYdfEwDdHHJcmV7bbODQx+LKvway+Jz+o6GNgtGDFpYmhQ/7OQzQrHO5Nai8vDj1uvw6n2y8pb30U4wrn7k/UML9lbPy48fCT5w8YcIPgCSpPIp+KXFVfOs/5rtMzE0i7hpExr4EBH6hUlJxl9fz5rmvuK0tgaQdUAQAAfDkdLramfLkAAAAASUVORK5CYII="/>
        </svg>
        <div>
          <h2>We'd Love To Hear From You</h2>
          <br/>
          <p>
            Have a specific question in mind?
            Feel free to reach out and let us know how we can help.
          </p>
        </div>
      </div>        
      <div styleName="right">
        <h1>Need help?</h1>
        <ContactForm company={props.match.params.company}/>
      </div>    
    </div>
  )
}

export default Support