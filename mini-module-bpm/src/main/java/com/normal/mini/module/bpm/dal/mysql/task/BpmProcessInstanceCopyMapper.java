package com.normal.mini.module.bpm.dal.mysql.task;

import com.normal.mini.framework.common.pojo.PageResult;
import com.normal.mini.framework.mybatis.core.mapper.BaseMapperX;
import com.normal.mini.framework.mybatis.core.query.LambdaQueryWrapperX;
import com.normal.mini.module.bpm.controller.admin.task.vo.instance.BpmProcessInstanceCopyPageReqVO;
import com.normal.mini.module.bpm.dal.dataobject.task.BpmProcessInstanceCopyDO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BpmProcessInstanceCopyMapper extends BaseMapperX<BpmProcessInstanceCopyDO> {

    default PageResult<BpmProcessInstanceCopyDO> selectPage(Long loginUserId, BpmProcessInstanceCopyPageReqVO reqVO) {
        return selectPage(reqVO, new LambdaQueryWrapperX<BpmProcessInstanceCopyDO>()
                .eqIfPresent(BpmProcessInstanceCopyDO::getUserId, loginUserId)
                .likeIfPresent(BpmProcessInstanceCopyDO::getProcessInstanceName, reqVO.getProcessInstanceName())
                .betweenIfPresent(BpmProcessInstanceCopyDO::getCreateTime, reqVO.getCreateTime())
                .orderByDesc(BpmProcessInstanceCopyDO::getId));
    }

    default void deleteByProcessInstanceId(String processInstanceId) {
        delete(BpmProcessInstanceCopyDO::getProcessInstanceId, processInstanceId);
    }

}
