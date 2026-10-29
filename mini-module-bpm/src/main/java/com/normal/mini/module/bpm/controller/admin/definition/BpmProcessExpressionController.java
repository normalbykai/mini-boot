package com.normal.mini.module.bpm.controller.admin.definition;

import com.normal.mini.framework.common.pojo.CommonResult;
import com.normal.mini.framework.common.pojo.PageParam;
import com.normal.mini.framework.common.pojo.PageResult;
import com.normal.mini.framework.common.util.object.BeanUtils;
import com.normal.mini.framework.apilog.core.annotation.ApiAccessLog;
import com.normal.mini.framework.excel.core.util.ExcelUtils;
import com.normal.mini.module.bpm.controller.admin.definition.vo.expression.BpmProcessExpressionPageReqVO;
import com.normal.mini.module.bpm.controller.admin.definition.vo.expression.BpmProcessExpressionRespVO;
import com.normal.mini.module.bpm.controller.admin.definition.vo.expression.BpmProcessExpressionSaveReqVO;
import com.normal.mini.module.bpm.dal.dataobject.definition.BpmProcessExpressionDO;
import com.normal.mini.module.bpm.service.definition.BpmProcessExpressionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

import static com.normal.mini.framework.common.pojo.CommonResult.success;
import static com.normal.mini.framework.apilog.core.enums.OperateTypeEnum.EXPORT;

@Tag(name = "管理后台 - BPM 流程表达式")
@RestController
@RequestMapping("/bpm/process-expression")
@Validated
public class BpmProcessExpressionController {

    @Resource
    private BpmProcessExpressionService processExpressionService;

    @PostMapping("/create")
    @Operation(summary = "创建流程表达式")
    @PreAuthorize("@ss.hasPermission('bpm:process-expression:create')")
    public CommonResult<Long> createProcessExpression(@Valid @RequestBody BpmProcessExpressionSaveReqVO createReqVO) {
        return success(processExpressionService.createProcessExpression(createReqVO));
    }

    @PutMapping("/update")
    @Operation(summary = "更新流程表达式")
    @PreAuthorize("@ss.hasPermission('bpm:process-expression:update')")
    public CommonResult<Boolean> updateProcessExpression(@Valid @RequestBody BpmProcessExpressionSaveReqVO updateReqVO) {
        processExpressionService.updateProcessExpression(updateReqVO);
        return success(true);
    }

    @DeleteMapping("/delete")
    @Operation(summary = "删除流程表达式")
    @Parameter(name = "id", description = "编号", required = true)
    @PreAuthorize("@ss.hasPermission('bpm:process-expression:delete')")
    public CommonResult<Boolean> deleteProcessExpression(@RequestParam("id") Long id) {
        processExpressionService.deleteProcessExpression(id);
        return success(true);
    }

    @GetMapping("/get")
    @Operation(summary = "获得流程表达式")
    @Parameter(name = "id", description = "编号", required = true, example = "1024")
    @PreAuthorize("@ss.hasPermission('bpm:process-expression:query')")
    public CommonResult<BpmProcessExpressionRespVO> getProcessExpression(@RequestParam("id") Long id) {
        BpmProcessExpressionDO processExpression = processExpressionService.getProcessExpression(id);
        return success(BeanUtils.toBean(processExpression, BpmProcessExpressionRespVO.class));
    }

    @GetMapping("/page")
    @Operation(summary = "获得流程表达式分页")
    @PreAuthorize("@ss.hasPermission('bpm:process-expression:query')")
    public CommonResult<PageResult<BpmProcessExpressionRespVO>> getProcessExpressionPage(
            @Valid BpmProcessExpressionPageReqVO pageReqVO) {
        PageResult<BpmProcessExpressionDO> pageResult = processExpressionService.getProcessExpressionPage(pageReqVO);
        return success(BeanUtils.toBean(pageResult, BpmProcessExpressionRespVO.class));
    }

    @GetMapping("/export-excel")
    @Operation(summary = "导出流程表达式 Excel")
    @PreAuthorize("@ss.hasPermission('bpm:process-expression:export')")
    @ApiAccessLog(operateType = EXPORT)
    public void exportProcessExpression(@Valid BpmProcessExpressionPageReqVO pageReqVO,
                                        HttpServletResponse response) throws IOException {
        pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE);
        PageResult<BpmProcessExpressionDO> pageResult = processExpressionService.getProcessExpressionPage(pageReqVO);
        ExcelUtils.write(response, "流程表达式.xls", "数据", BpmProcessExpressionRespVO.class,
                BeanUtils.toBean(pageResult.getList(), BpmProcessExpressionRespVO.class));
    }

}
