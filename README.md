> sunrin-instagram-cli


<br/>
<p align="center">💎 <b>sunrin-instagram</b></p>
<p align="center">매일 인스타그램에 선린인고 급식 정보를 올려주는 서비스</p>

<div align="center">

![Github Issue](https://img.shields.io/github/issues/sunrin-project/instagram)
![Github PR](https://img.shields.io/github/issues-pr/sunrin-project/instagram)

</div>

> 2024-04-17 기준으로 NEIS API를 이용한 자동화는 아직 지원하지 않고 있습니다

> 서비스 도입 문의는<br/>
> 디스코드 아이디 **iam.firo** 혹은<br/>
> **@sunrin_today** 인스타그램 DM으로 부탁드려요

<div style="height: 40px"></div>

Contents
========
- [Stack](#stack)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage](#usage)
- [Trouble Shooting](#troubleshooting)
- [Developers](#developer)
- [Contact](#contact)


### Stack <a href="stack"></a>

`Javascript` - Instagram 이미지 업로드, Cron Job을 관리<br/>

`Python` - Pillow 라이브러리를 사용해 인스타그램에 업로드 할 이미지를 생성<br/>

`Youtube Music` - ~~개발을 하기위한 [iamfiro](https://github.com/iamfiro)의 레드불~~

`Apple Music` - ~~개발을 할 때 [jwkwon0817](https://github.com/jwkwon0817)의 기력을 채워준 도구~~

---

### Folder Structure <a href="folder-structure"></a>

**/assets** - 급식 이미지 생성에 필요한 이미지 템플릿이나 폰트등 다양한 에셋 파일이 있는 곳

**.gitignore** - Github에 올라가면 안되는 파일을 적어둔 파일 (예시: .env 파일)

**package-lock.json** - node_modules 디렉토리에 설치된 패키지들의 의존성 트리 (npm)

**package.json** - 개발자가 배포한 패키지에 대해, 다른 사람들이 관리하고 설치하기 쉽게 하기 위한 문서
README.md - 현재 보고있는 문서

**index.js** - Instagram, Cron Job을 관리

**scripts/image_maker.py** - Pillow 라이브러리를 사용해 인스타그램에 업로드 할 이미지를 생성

---

### Installation <a href="installation"></a>

#### Git Clone

```bash
git clone https://github.com/sunrin-project/instagram.git
```

---

### Dependencies <a href="dependencies"></a>
`sunrin-instagram-cli` 를 이용하여 급식 데이터를 더 쉽게 관리합니다

---

### Usage <a href="usage"></a>

1. 프로젝트 클론 후 `npx sic init` 명령어로 프로젝트 config.js 파일 생성 (자세한 사용법은 [여기를 클릭](https://github.com/sunrin-project/instagram-cli/blob/main/README.md))
2. `sunrin-instagram-cli` 라이브러리를 이용하여 급식 데이터 관리 (자세한 사용법은 [여기를 클릭](https://github.com/sunrin-project/instagram-cli/blob/main/README.md))
3. `npm run start`로 인스타그램 스케줄러 실행
---

### Trouble Shooting <a href="troubleshooting"></a>

<details>
  <summary>그냥 NEIS API 써서 자동화 하면 되는거 아닌가요?</summary>
  <br/>
  저희도 프로젝트 초기에 NEIS API를 활용하여 프로그램을 자동화하려는 계획을 세웠습니다.<br/>그러나 개발 중에 NEIS API를 사용해보니 데이터를 불러오는 데 문제가 발생하거나, 오래된 데이터를 반환하는 경우가 많았습니다.<br/>
  또한 NEIS에서 제공하는 데이터를 그대로 사용하기 때문에 <b>데이터 가공이 어려웠습니다</b>.<br/>
  특히, 급식 정보의 음식 이름이 너무 길 경우 이미지가 표시되지 않는 버그가 발생했습니다. (예: <b>추억의경양식돈까스&소스</b>는 <b>돈까스</b>로 요약이 가능)<br/>
  이러한 문제들을 고려하여 "<b>직접 JSON에 급식 정보를 관리하자</b>"는 결정을 내리게 되었습니다.

  이러한 결정에 따라 매일 JSON을 관리하는 번거로움을 줄이기 위해 CLI 도구인 `📦sunrin-instagram-cli`를 개발하였습니다.<br/>
  이를 통해 JSON 데이터 관리를 효율적으로 수행할 수 있게 되었습니다.
</details>

---

### Developers <a href="developer"></a>
- <a href="https://github.com/iamfiro">@iamfiro</a> - 📦 이미지 업로드 기능, 스케줄러, CLI 개발
- <a href="https://github.com/jwkwon0817">@jwkwon0817</a> - 📦 템플릿 기반 이미지 생성 (Python), 스케쥴러와 CLI 개발 기여

---

### Contact <a href="contact"></a>
<a href="https://www.instagram.com/sunrin_today/"><img style="border-radius: 4px" src="https://img.shields.io/badge/Instagram-E4405F?style=flat-square&logo=Instagram&logoColor=white&link=https://www.instagram.com/sunrin_today/"/></a>
> **@sunrin_today** - 인스타그램
