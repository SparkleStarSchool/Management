$(document).ready(()=>{
    let $deleteModal = $(`<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" data-backdrop="static">
                            <div class="modal-dialog modal-sm" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title"></h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <p>确定删除吗？</p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-warning" data-dismiss="modal" id="ok-btn">确定</button>
                                        <button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
                                    </div>
                                </div>
                            </div>
                        </div> `)
    $('main').append($deleteModal)

    // for delete button
    $('#delete-btn').on('click', ()=>{
        $("#deleteModal").modal();
    })

    let $warningModal = $(`<div class="modal fade" id="warningModal" tabindex="-1" role="dialog" data-backdrop="static">
                            <div class="modal-dialog modal-sm" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title"></h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <p></p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-warning" data-dismiss="modal" id="warning-btn">确定</button>
                                    </div>
                                </div>
                            </div>
                        </div> `)
    $('main').append($warningModal)
})