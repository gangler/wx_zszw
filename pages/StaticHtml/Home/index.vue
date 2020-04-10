<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--自动适应移动屏幕-->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <!--优先使用webkit内核渲染-->
    <meta name="renderer" content="webkit" />
    <!--不要被百度转码-->
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <title>易政达掌上政务</title>
    <link rel="stylesheet" href="../../Dist/assets/css/amazeui.min.css" />
    <link rel="stylesheet" href="../../Dist/assets/css/app.css" />
</head>

<body>
    <!--<nav data-am-widget="navbar" class="am-navbar am-cf am-navbar-default">
        <ul class="am-navbar-nav am-cf am-avg-sm-4" id="navbar">
            <li>
                <a href="index.html" class="">
                    <span class="am-icon-question-circle"></span>
                    <span class="am-navbar-label">问事</span>
                </a>
            </li>
            <li>
                <a href="../work/work.html" class="">
                    <span class="am-icon-bank"></span>
                    <span class="am-navbar-label">办事</span>
                </a>
            </li>
            <li>
                <a href="../user/user.html" class="">
                    <span class="am-icon-user"></span>
                    <span class="am-navbar-label">我的</span>
                </a>
            </li>
        </ul>
    </nav>-->

    <main>
        <div class="am-slider am-slider-default am-margin-0" data-am-flexslider data-am-widget="slider" data-am-slider='{}' >
            <ul class="am-slides" id="slidesList"></ul>
        </div>

        <section>
            <h3 class="am-margin-0 am-padding-sm">办事指南</h3>
            <ul class="am-g am-g-collapse am-padding-0 department-list" id="workGuideList"></ul>
        </section>

        <section class="border-top-10">
            <h3 class="am-margin-0">
                <a class="am-padding-sm am-block" href="../shared/news.html">新闻资讯
                    <span class="am-fr am-icon-angle-right"></span>
                </a>
            </h3>
            <ul class="am-list am-margin-0" id="newsInfoList"></ul>
        </section>
    </main>

    <div class="am-modal am-modal-prompt" id="my-prompt">
        <div class="am-modal-dialog">
            <div class="am-modal-hd">绑定手机号</div>
            <div class="am-modal-bd">
                <div class="am-input-group am-margin-bottom-sm">
                    <span class="am-input-group-label">手机号</span>
                    <input type="number" class="am-form-field am-modal-prompt-input am-margin-0"
                        placeholder="请输入手机号">
                </div>
                <div class="am-input-group am-margin-bottom-sm">
                    <span class="am-input-group-label">密码</span>
                    <input type="text" id="password" class="am-form-field am-modal-prompt-input am-margin-0" placeholder="请输入密码">
                </div>
            </div>
            <div class="am-modal-footer">
                <span class="am-modal-btn" data-am-modal-cancel>取消</span>
                <span class="am-modal-btn" data-am-modal-confirm>绑定</span>
            </div>
        </div>
    </div>

    <script type="text/html" id="slideTemp">
        <li class="am-block">
            <a href="../shared/news-details.html?id=[id]">
                <img src='[src]'>
            </a>
        </li>
    </script>

    <script type="text/html" id="workGuideTemp">
        <li class="am-u-sm-3 am-u-end">
            <a class="am-block am-padding-sm" href="../shared/department-list.html?id=[id]&">
                <img class="am-circle" src='[src]'>
                <span class="am-padding-0 am-margin-top-xs am-block am-text-center am-ellipsis am-text-xs">[name]</span>
            </a>
        </li>
    </script>

    <script type="text/html" id="newsInfoTemp">
        <li>
            <a href="../shared/news-details.html?id=[id]">
                <div class="am-g flex align-center">
                    <div class="am-u-sm-5">
                        <img src='[src]'>
                    </div>
                    <div class="am-u-sm-7">
                        <p class="ellipsis-2 am-margin-0 am-text-sm">[title]</p>
                        <span class="am-text-xs am-block am-margin-top-sm am-text-left">[date]</span>
                    </div>
                </div>
            </a>
        </li>
    </script>

    <script src="../../Scripts/globalconfigs.js"></script>
    <script src="../../Dist/assets/js/jquery-3.4.1.js"></script>
    <script src="../../Dist/assets/js/amazeui.min.js"></script>
    <script src="../../Dist/assets/js/setNavStyle.js"></script>
    <script src="../../Dist/assets/js/md5.js"></script>
    <script src="../../Dist/assets/js/toast.js"></script>
    <script>
        $(function () {
            //login();
            getSlides();
            getWorkGuide();
            getNewsInformation();
        })
         
        // window.addEventListener("storage", function (e) {
        //     console.log(e.newValue);
        //     if (e.data == null) {
        //         getUserInfo()
        //     }
        // })

        var isLoading = false;

        //window.addEventListener("storage", function (e) {
        //    window.reload()
        //})

        //function login() {
        //    var user = JSON.parse(localStorage.getItem("user"));
        //    if (user == null) {
        //        getUserInfo()
        //    }
        //}

        //function getUserInfo() {
        //    $('#my-prompt').modal({
        //        relatedTarget: this,
        //        closeOnConfirm: false,
        //        onConfirm: function (e) {
        //            if (e.data[0] == '' || e.data[0].length > 11 || e.data[0].length < 11) {
        //                toast("请输入正确的手机号");
        //            } else if (!e.data[1].match(/\d/) || !e.data[1].match(/[a-zA-Z]/) || e.data[1].length < 6) {
        //                toast('请输入正确的密码')
        //            } else {
        //                var phone = e.data[0];
        //                var password = $.md5('YZD1234567890' + e.data[1]);
        //                console.log(phone);
        //                console.log(password);

        //                $.ajax({
        //                    url: serverurl +'/gxfrTL/login',
        //                    type: 'POST',
        //                    data: {
        //                        username: phone,
        //                        password: password,
        //                        device_token: '',
        //                        UserType: 2
        //                    },
        //                    success: function (res) {
        //                        console.log(res);
        //                         if (res.data == null) {
        //                            toast('账号或密码错误');
        //                        } else {
        //                            toast('登录成功');
        //                            $('#my-prompt').modal();
        //                            localStorage.clear();
        //                            localStorage.setItem("user", JSON.stringify(res.data));
        //                        }
        //                    }
        //                })
        //            }
        //        }
        //    })
        //}

        // 获取轮播图
        function getSlides() {
            $.ajax({
                url: serverurl +"/gxsdapi/getCarousel",
                data: {
                    UserType: 2
                },
                success: function (res) {
                    var html = $("#slideTemp").html();
                    var count = 0;
                    $.each(res.data, function (index, item) {
                        var source = html.replace('[src]', item.picture)
                            .replace('[id]', item.information_id)
                        $("#slidesList").append(source);
                        count++;
                        if (count >= res.data.length) {
                            isLoading = true;
                            runSlide();
                        }    
                    });
                    
                }
            })
        }

        function runSlide() {
            if (isLoading) {
                $('.am-slider').flexslider();  
            }
        }

        // 获取办事指南
        function getWorkGuide() {
            $.ajax({
                url: serverurl +"/gxfrTL/get_base_dic",
                success: function (res) {
                    var html = $("#workGuideTemp").html();
                    $.each(res.Data.D001, function (index, item) {
                        var source = html.replace('[src]', item.SAVPATH)
                            .replace('[name]', item.CNAME)
                            .replace('[id]', item.ID)
                        $("#workGuideList").append(source);
                        $("#workGuideList img").height($("#workGuideList img").width());
                        
                    })
                }
            })
        }

        // 获取新闻资讯
        function getNewsInformation() {
            $.ajax({
                url: serverurl +"/gxsdapi/get_information_list",
                data: {
                    category_id: 1
                },
                success: function (res) {
                    var picture = '';
                    var source = '';
                    var html = $("#newsInfoTemp").html();

                    $.each(res.data.data, function (index, item) {
                        if (item.picture == '') {
                            picture = '../../Dist/assets/img/img-404.png'
                        } else {
                            picture = item.picture;
                        }

                        source += html.replace('[id]', item.informationId)
                            .replace('[src]', picture)
                            .replace('[title]', item.title)
                            .replace('[date]', item.publishTime)
                    });

                    $("#newsInfoList").append(source);
                }
            })
        }
    </script>
</body>

</html>